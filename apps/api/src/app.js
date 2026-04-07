const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();

app.use(cors());

// Middleware om JSON-gegevens te kunnen verwerken
app.use(express.json());

require('./routes/index.js')(app);

module.exports = app;