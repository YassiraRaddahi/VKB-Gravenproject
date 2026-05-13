exports.up = function (knex) {
  return knex.schema.createTable('cleanups', (table) => {
    table.increments('id');
    table.integer('grave_id').unsigned().notNullable()
      .references('id').inTable('graves');
    table.enu('status', ['volledig', 'gedeeltelijk', 'niet schoon']).notNullable();
    table.text('remarks').nullable().defaultTo(null);
    table.timestamp('cleaned_at').nullable().defaultTo(null);
    table.timestamp('created_at').nullable().defaultTo(null);
    table.timestamp('updated_at').nullable().defaultTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cleanups');
};
