exports.up = function (knex) {
  return knex.schema.createTable('graves', (table) => {
    table.increments('id');
    table.integer('cemetery_id').unsigned().notNullable()
      .references('id').inTable('cemeteries');
    table.enu('type', ['algemeen graf', 'particulier graf']).notNullable();
    table.enu('sort', ['dubbel graf', 'enkel graf', 'kindergraf', 'urnengraf', 'keldergraf']).notNullable();
    table.string('grave_number', 20).notNullable();
    table.decimal('latitude', 10, 7).notNullable();
    table.decimal('longitude', 10, 7).notNullable();
    table.string('image_url', 1024).defaultTo(null);
    table.text('remarks').defaultTo(null);
    table.enu('status', ['beschikbaar', 'in gebruik', 'gereserveerd']).notNullable();
    table.timestamp('last_opened_at').defaultTo(null);
    table.timestamp('last_cleared_at').defaultTo(null);
    table.timestamp('created_at').defaultTo(null);
    table.timestamp('updated_at').defaultTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('graves');
};
