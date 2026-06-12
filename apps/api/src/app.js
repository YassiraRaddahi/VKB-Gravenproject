const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config()

module.exports = function(knex) {
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

  require('./routes/index.js')(app, knex);

  return app;
};