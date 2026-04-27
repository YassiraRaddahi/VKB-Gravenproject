const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express();


const allowedOrigins = [
  'http://localhost:5173',
  'https://yassira.kerkhovenbeheer.nl'
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware om JSON-gegevens te kunnen verwerken
app.use(express.json());
app.use(cookieParser())

require('./routes/index.js')(app);

module.exports = app;