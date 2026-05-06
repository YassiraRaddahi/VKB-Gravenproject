exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('first_name', 100).notNullable();
    table.string('infix', 20).defaultTo(null);
    table.string('last_name', 100).notNullable();
    table.string('address', 255).notNullable();
    table.string('zip_code', 7).notNullable();
    table.string('city', 100).notNullable();
    table.string('email', 255).notNullable().unique();
    table.timestamp('email_verified_at').defaultTo(null);
    table.string('phone_number', 20).notNullable();
    table.string('profile_picture_url', 1024).defaultTo(null);
    table.string('relation_to_deceased', 100).defaultTo(null);
    table.string('password_hash', 255).defaultTo(null);
    table.string('remember_token', 255).defaultTo(null);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
