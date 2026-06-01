async function resetDatabase(knex) {

    const tables = await knex.raw(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = DATABASE()
  `);

    const tableNames = tables[0].map(t => t.TABLE_NAME);

    if (tableNames.length > 0) {
        await knex.raw("SET FOREIGN_KEY_CHECKS = 0");

        for (const table of tableNames) {
            // sla knex interne tabellen over
            if (table === 'knex_migrations' || table === 'knex_migrations_lock') {
                continue;
            }
            await knex.raw(`DROP TABLE IF EXISTS \`${table}\``);
        }

        await knex.raw("SET FOREIGN_KEY_CHECKS = 1");
    }

    console.log("Database volledig geleegd");
}

module.exports = resetDatabase;