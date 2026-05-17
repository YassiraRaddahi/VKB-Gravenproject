exports.up = function (knex) {
  return knex.schema.createTable('cleanups', (table) => {
    table.increments('id');
    table.integer('grave_id').unsigned().notNullable()
      .references('id').inTable('graves').onUpdate('CASCADE').onDelete('RESTRICT');
    table.enu('status', ['volledig', 'gedeeltelijk', 'niet schoon']).notNullable();
    table.text('remarks').defaultTo(null);
    table.timestamp('cleaned_at').nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cleanups');
};
