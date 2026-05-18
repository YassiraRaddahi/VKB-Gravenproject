exports.up = function (knex) {
  return knex.schema.createTable('cemetery_images', (table) => {
    table.increments('id');
    table.integer('cemetery_id').unsigned().notNullable()
      .references('id').inTable('cemeteries').onUpdate('CASCADE').onDelete('CASCADE');
    table.string('image_url', 255).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cemetery_images');
};
