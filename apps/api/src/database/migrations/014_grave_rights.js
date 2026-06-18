exports.up = function (knex) {
  return knex.schema.createTable('grave_rights', (table) => {
    table.increments('id');
    table.integer('grave_id').unsigned().notNullable()
      .references('id').inTable('graves').onUpdate('CASCADE').onDelete('RESTRICT');
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onUpdate('CASCADE').onDelete('RESTRICT');
    table.string('contract_number', 50).notNullable().unique();
    table.enu('contract_type', ['eerste uitgifte', 'verlenging', 'onbepaalde tijd']).notNullable();
    table.date('start_date').notNullable();
    table.date('end_date').nullable().defaultTo(null);
    table.integer('duration_years').unsigned().nullable().defaultTo(null);
    table.decimal('amount_total', 10, 2).notNullable();
    table.decimal('amount_burial_right', 10, 2).notNullable().defaultTo(0);
    table.decimal('amount_maintenance', 10, 2).notNullable().defaultTo(0);
    table.decimal('amount_additional_interment', 10, 2).notNullable().defaultTo(0);
    table.enu('status', ['lopend', 'verlopen', 'opgezegd', 'verlengd']).notNullable().defaultTo('lopend');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('grave_rights');
};
