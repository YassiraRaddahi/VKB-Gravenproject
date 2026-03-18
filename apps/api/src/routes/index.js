module.exports = function (app) {
    
   
    const conn_db = require('../config/db-conn.js');
    require('../modules/home/home.routes.js')(app);
    require('../modules/users/users.routes.js')(app, conn_db);
    require('../modules/auth/auth.routes.js')(app, conn_db);
    require('../modules/cemeteries/cemeteries.routes.js')(app,conn_db);
    require('../modules/graves/graves.routes.js')(app,conn_db);

    
}