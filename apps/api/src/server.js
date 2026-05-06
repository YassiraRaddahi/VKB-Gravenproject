const path = require('path');
const app = require(path.join(__dirname, 'app'));

const port = process.env.PORT || 3001;


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

