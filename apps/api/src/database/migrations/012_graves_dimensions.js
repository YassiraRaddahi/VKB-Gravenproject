exports.up = function (knex) {
  return knex.schema.createTable('graves_dimensions', (table) => {
    table.increments('id');

    table.integer('grave_id')
      .unsigned()
      .notNullable()
      .unique()
      .references('id')
      .inTable('graves')
      .onDelete('CASCADE');

    table.integer('width').nullable();
    table.integer('length').nullable();

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('graves_dimensions');
};