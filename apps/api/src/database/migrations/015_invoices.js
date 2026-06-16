exports.up = function (knex) {
  return knex.schema.createTable('invoices', (table) => {
    table.increments('id');
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('grave_id').unsigned().nullable().defaultTo(null)
      .references('id').inTable('graves').onUpdate('CASCADE').onDelete('SET NULL');
    table.integer('grave_right_id').unsigned().nullable().defaultTo(null)
      .references('id').inTable('grave_rights').onUpdate('CASCADE').onDelete('SET NULL');
    table.string('invoice_number', 50).notNullable().unique();
    table.decimal('amount', 10, 2).notNullable();
    table.enu('status', ['open', 'betaald', 'verlopen', 'geannuleerd']).notNullable().defaultTo('open');
    table.timestamp('issued_at').notNullable().defaultTo(knex.fn.now());
    table.date('due_date').notNullable();
    table.timestamp('paid_at').nullable().defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('invoices');
};
