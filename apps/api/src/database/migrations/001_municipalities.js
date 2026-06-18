exports.up = function (knex) {
  return knex.schema.createTable('municipalities', (table) => {
    table.increments('id');
    table.string('name', 100).notNullable().unique();
    table.text('remarks').defaultTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('municipalities');
};
