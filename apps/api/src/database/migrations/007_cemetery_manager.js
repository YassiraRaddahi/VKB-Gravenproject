exports.up = function (knex) {
  return knex.schema.createTable('cemetery_manager', (table) => {
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('cemetery_id').unsigned().notNullable()
      .references('id').inTable('cemeteries').onUpdate('CASCADE').onDelete('CASCADE');
    table.primary(['user_id', 'cemetery_id']);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cemetery_manager');
};
