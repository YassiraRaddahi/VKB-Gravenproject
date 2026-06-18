function verifyToken(req, res, next) {
    
    const jwt = require("jsonwebtoken");

    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: "Toegang geweigerd" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Ongeldig of verlopen token" });
    }
}

module.exports = { verifyToken };