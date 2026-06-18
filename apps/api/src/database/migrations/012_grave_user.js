exports.up = function (knex) {
  return knex.schema.createTable('grave_user', (table) => {
    table.integer('grave_id').unsigned().notNullable()
      .references('id').inTable('graves').onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    table.primary(['grave_id', 'user_id']);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('grave_user');
};
