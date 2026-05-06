exports.up = function (knex) {
  return knex.schema.createTable('cemetery_manager', (table) => {
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('cemetery_id').unsigned().notNullable()
      .references('id').inTable('cemeteries').onDelete('CASCADE');
    table.primary(['user_id', 'cemetery_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cemetery_manager');
};
