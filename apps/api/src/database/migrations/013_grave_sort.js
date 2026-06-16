exports.up = function (knex) {
  return knex.schema.createTable('grave_sort', (table) => {
    table.increments('id');

    table.string('grave_id').notNullable().unique();

    table.integer('length').nullable();
    table.integer('width').nullable();

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('grave_sort');
};