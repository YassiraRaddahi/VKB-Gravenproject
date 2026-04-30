const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://bram.kerkhovenbeheer.nl"],
    credentials: true,
  })
);

// Middleware om JSON-gegevens te kunnen verwerken
app.use(express.json());
app.use(cookieParser());

require("./routes/index.js")(app);

module.exports = app;
