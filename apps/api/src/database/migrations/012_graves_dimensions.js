
exports.up = function(knex) {
   return knex.schema.createTable('graves_dimensions', (table) => {
    table.increments('id');
    table.integer('grave_id').unsigned().notNullable()
      .references('id').inTable('graves').onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('lengte').unsigned().nullable();
    table.integer('breedte').unsigned().nullable();
    table.timestamps(true, true);
  });
};


exports.down = function(knex) {
  return knex.schema.dropTable('graves_dimensions');
};
