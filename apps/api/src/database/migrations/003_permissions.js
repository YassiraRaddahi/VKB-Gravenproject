exports.up = function (knex) {
  return knex.schema.createTable('permissions', (table) => {
    table.increments('id');
    table.string('name', 60).notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('permissions');
};
