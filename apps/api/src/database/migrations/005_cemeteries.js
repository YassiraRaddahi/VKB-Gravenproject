exports.up = function (knex) {
  return knex.schema.createTable('cemeteries', (table) => {
    table.increments('id');
    table.string('name', 100).notNullable();
    table.string('address', 255).notNullable();
    table.string('zip_code', 7).notNullable();
    table.string('city', 100).notNullable();
    table.string('email', 255).defaultTo(null).unique();
    table.string('phone_number', 20).defaultTo(null);
    table.string('website_url', 1024).defaultTo(null);
    table.text('remarks').defaultTo(null);
    table.integer('municipalityID').unsigned().notNullable()
      .references('id').inTable('municipalities').onUpdate('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cemeteries');
};
