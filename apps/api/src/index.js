const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors());

// Middleware om JSON-gegevens te kunnen verwerken
app.use(express.json());

require('./routes')(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})