exports.up = function (knex) {
  return knex.schema.createTable('role_user', (table) => {
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('role_id').unsigned().notNullable()
      .references('id').inTable('roles').onDelete('CASCADE').onUpdate('CASCADE');
    table.primary(['user_id', 'role_id']);
    table.timestamp('created_at').defaultTo(null);
    table.timestamp('updated_at').defaultTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('role_user');
};
