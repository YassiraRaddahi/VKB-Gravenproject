const resetDatabase = require("./utils/resetDatabase.js");

const knexConfig = require("../knexfile");

const knex = require("knex")(knexConfig);

const path = require('path');

const port = process.env.PORT || 3001;


async function startServer() {
    console.log("SERVER STARTED - RESET RUN");
    try {
        await resetDatabase(knex);

        console.log("Running migrations...");
        await knex.migrate.latest();
        console.log("Migrations succesvol uitgevoerd");

        console.log("Running seeds...");
        await knex.seed.run();
        console.log("Seeds succesvol uitgevoerd");

        console.log("Server starten...");
        const app = require(path.join(__dirname, 'app'))(knex);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        });
    } catch (err) {
        console.error("Migration fout:", err);
    }
}

startServer(knex);




