module.exports = function (app) {

app.get('/api/home', (req, res) => {
        res.send({'message': 'Homepagina informatie uit database'});
    });

}