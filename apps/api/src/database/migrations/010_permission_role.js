exports.up = function (knex) {
  return knex.schema.createTable('permission_role', (table) => {
    table.integer('role_id').unsigned().notNullable()
      .references('id').inTable('roles').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('permission_id').unsigned().notNullable()
      .references('id').inTable('permissions').onDelete('CASCADE').onUpdate('CASCADE');
    table.primary(['role_id', 'permission_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('permission_role');
};
