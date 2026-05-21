exports.up = function (knex) {
  return knex.schema.createTable('cemeteries', (table) => {
    table.increments('id');
    table.string('name', 100).notNullable();
 
    table.string('street_name', 100).notNullable();
    table.string('house_number', 10);
    table.string('house_letter', 4);
    table.string('house_number_addition', 10);
    table.string('zip_code', 8).notNullable();
    table.string('city', 100).notNullable();
 
    table.string('email', 255).unique();
    table.string('phone_number', 15);
 
    table.string('iban_iv', 255);
    table.string('iban_encrypted', 255);
    table.string('iban_tag', 255);
 
    table.string('website_url', 1024);
 
    table.text('remarks');
   
    table.integer('municipality_id').unsigned().notNullable()
      .references('id').inTable('municipalities').onUpdate('CASCADE').onDelete('RESTRICT');
    table.timestamps(true, true);
  });
};
 
exports.down = function (knex) {
  return knex.schema.dropTable('cemeteries');
};