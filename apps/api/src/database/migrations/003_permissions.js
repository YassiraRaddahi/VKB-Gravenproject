exports.up = function (knex) {
  return knex.schema.createTable("permissions", (table) => {
    table.increments("id");
    table.string("name", 100).notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("permissions");
};
