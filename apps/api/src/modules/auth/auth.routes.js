module.exports = function (app, conn_db) {
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const rateLimit = require("express-rate-limit");
  const isProduction = process.env.NODE_ENV === "production";

    const loginLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 5,
        message: function (req, res) {
            const resetTime = new Date(req.rateLimit.resetTime).toLocaleString('nl-NL');
            return res.status(429).json({ error: `Te veel pogingen, probeer het na ${resetTime} opnieuw` });
        },
        standardHeaders: true,
        legacyHeaders: false,
    });

  function verifyToken(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "Niet ingelogd" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Ongeldig of verlopen token" });
    }
  }

  // ─── Login ───
  app.post(
    "/api/login",
    ...(isProduction ? [loginLimiter] : []),
    (req, res) => {
      try {
        let email = req.body.email;
        let password = req.body.password;

        let sql = `SELECT users.id, users.email, users.password_hash, roles.name AS role_name
                FROM users
                JOIN role_user ON users.id = role_user.user_id
                JOIN roles ON role_user.role_id = roles.id
                WHERE users.email = ?`;

        conn_db.query(sql, [email], async function (err, rows) {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
          }

          if (!rows || rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
          }

          let user = rows[0];

          const password_correct = await bcrypt.compare(
            password,
            user.password_hash
          );

          if (!password_correct) {
            return res.status(401).send({ error: "Invalid credentials" });
          }

          const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role_name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            domain: isProduction ? ".bram.kerkhovenbeheer.nl" : undefined,
            path: "/",
            maxAge: 3600000, // 1 uur
          });

          res.send({ message: "Login successful" });
        });
      } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  app.get("/api/active-token", verifyToken, (req, res) => {
    const userSql = `
            SELECT users.id, users.initials, users.first_names, users.infix, 
            users.last_name, users.partner_infix, users.partner_last_name, 
            users.name_usage, users.gender, users.date_of_birth, users.place_of_birth, 
            users.street_name, users.house_number, users.house_letter, 
            users.house_number_addition, users.zip_code, users.city, users.email,
            users.phone_number, users.mobile_number, users.profile_picture_url,
            users.position, roles.name AS role_name, roles.id AS role_id
            FROM users
            JOIN role_user ON users.id = role_user.user_id
            JOIN roles ON role_user.role_id = roles.id
            WHERE users.id = ?
        `;

    conn_db.query(userSql, [req.user.id], (err, userRows) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (!userRows || userRows.length === 0) {
        return res.status(404).json({ error: "Gebruiker niet gevonden" });
      }

      const user = userRows[0];

      const permissionSql = `
            SELECT permissions.name
            FROM permission_role
            JOIN permissions ON permission_role.permission_id = permissions.id
            WHERE permission_role.role_id = ?
        `;

      conn_db.query(permissionSql, [user.role_id], (err, permissionRows) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }

        if (!permissionRows || permissionRows.length === 0) {
          return res
            .status(403)
            .json({ error: "Er zijn geen permissies gekoppeld aan deze rol" });
        }

        const permissions = permissionRows.map((r) => r.name);

        const filteredUser = { id: user.id };

        if (permissions.includes("user.view.name")) {
          filteredUser.initials = user.initials;
          filteredUser.first_names = user.first_names;
          filteredUser.infix = user.infix;
          filteredUser.last_name = user.last_name;
        }

        if (permissions.includes("user.view.partner_name")) {
          filteredUser.partner_infix = user.partner_infix;
          filteredUser.partner_last_name = user.partner_last_name;
        }

        if (permissions.includes("user.view.name_usage")) {
          filteredUser.name_usage = user.name_usage;
        }

        if (permissions.includes("user.view.gender")) {
          filteredUser.gender = user.gender;
        }

        if (permissions.includes("user.view.date_of_birth")) {
          filteredUser.date_of_birth = user.date_of_birth;
        }

        if (permissions.includes("user.view.place_of_birth")) {
          filteredUser.place_of_birth = user.place_of_birth;
        }

        if (permissions.includes("user.view.address")) {
          filteredUser.street_name = user.street_name;
          filteredUser.house_number = user.house_number;
          filteredUser.house_letter = user.house_letter;
          filteredUser.house_number_addition = user.house_number_addition;
          filteredUser.zip_code = user.zip_code;
          filteredUser.city = user.city;
        }

        if (permissions.includes("user.view.contact")) {
          filteredUser.email = user.email;
          filteredUser.phone_number = user.phone_number;
          filteredUser.mobile_number = user.mobile_number;
        }

        if (permissions.includes("user.view.profile_picture")) {
          filteredUser.profile_picture_url = user.profile_picture_url;
        }

        if (permissions.includes("user.view.position")) {
          filteredUser.position = user.position;
        }

        if (permissions.includes("user.view.role")) {
          filteredUser.role_name = user.role_name;
        }

        res.json({ user: filteredUser, permissions });
      });
    });
  });

  // ─── Wachtwoord aanpassen ───
  app.post("/api/change-password", verifyToken, (req, res) => {
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Vul beide wachtwoorden in" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Nieuw wachtwoord moet minimaal 6 tekens zijn" });
    }

    const selectSql = `SELECT id, password_hash FROM users WHERE id = ?`;

    conn_db.query(selectSql, [req.user.id], async function (err, rows) {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: "Gebruiker niet gevonden" });
      }

      const user = rows[0];

      if (!user.password_hash) {
        return res.status(400).json({
          error: "Er is nog geen wachtwoord ingesteld voor dit account",
        });
      }

      try {
        const password_correct = await bcrypt.compare(
          currentPassword,
          user.password_hash
        );

        if (!password_correct) {
          return res
            .status(401)
            .json({ error: "Huidig wachtwoord is onjuist" });
        }

        const newHash = await bcrypt.hash(newPassword, 10);

        const updateSql = `UPDATE users SET password_hash = ? WHERE id = ?`;

        conn_db.query(updateSql, [newHash, user.id], function (updateErr) {
          if (updateErr) {
            console.error("Database error:", updateErr);
            return res.status(500).json({ error: "Database error" });
          }

          res.json({ message: "Wachtwoord succesvol bijgewerkt" });
        });
      } catch (error) {
        console.error("Error during password change:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  });

  app.post("/api/logout", (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      domain: isProduction ? ".bram.kerkhovenbeheer.nl" : undefined,
      path: "/",
    });

    res.send({ message: "Logout successful" });
  });
};