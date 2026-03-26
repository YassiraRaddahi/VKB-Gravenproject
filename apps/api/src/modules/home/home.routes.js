module.exports = function (app) {

app.get('/api/home', (req, res) => {
        res.send({'message': 'Home page information from database'});
    });

}