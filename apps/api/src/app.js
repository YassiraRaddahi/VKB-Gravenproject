const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config()
const app = express();
app.set('trust proxy', true);

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://kerkhovenbeheer.nl'
  ],
  credentials: true
}));

app.options((/.*/), cors());

// Middleware om JSON-gegevens te kunnen verwerken
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser())

// Geüploade grafafbeeldingen statisch serveren (uploads/ staat naast src/)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

require('./routes/index.js')(app);

module.exports = app;