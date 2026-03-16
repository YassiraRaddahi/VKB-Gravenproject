const express = require('express')
const app = express()
const port = 3001

// Middleware om JSON-gegevens te kunnen verwerken
app.use(express.json());

require('./routes')(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})