module.exports = function (app) {

    const conn_db = require('../config/db-conn.js');
    require('../modules/home/home.routes.js')(app);
    require('../modules/users/users.routes.js')(app, conn_db);
    require('../modules/users/adminRoutes.js')(app, conn_db);
    require('../modules/users/cemeteryManager.routes.js')(app, conn_db);
    require('../modules/users/graveOwners.routes.js')(app, conn_db);
    require('../modules/users/graveCaretaker.routes.js')(app, conn_db);
    require('../modules/auth/auth.routes.js')(app, conn_db);
    require('../modules/cemeteries/cemeteries.routes.js')(app,conn_db);
    require('../modules/graves/graves.routes.js')(app,conn_db);
    require('../modules/contact/contact.routes.js')(app);
    require('../modules/invoices/invoices.routes.js')(app, conn_db);
}
