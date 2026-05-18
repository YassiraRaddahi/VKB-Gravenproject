exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');

    table.string('initials', 10);
    table.string('first_name', 100).notNullable();
    table.string('infix', 20);
    table.string('last_name', 100).notNullable();

    table.string('partner_infix', 20);
    table.string('partner_last_name', 100);

    table.string('name_usage', 30);

    table.date('date_of_birth');
    table.string('place_of_birth', 100);
  
    table.date('date_of_death');
    table.string('place_of_death', 100);

    table.string('street_name', 100);
    table.string('house_number', 10);
    table.string('house_letter', 7);
    table.string('house_number_addition', 7);
    table.string('zip_code', 7);
    table.string('city', 100);

    table.string('email', 255).notNullable().unique();
    table.timestamp('email_verified_at');

    table.string('phone_number', 20);
    table.string('mobile_number', 20);

    table.string('profile_picture_url', 1024);
    table.string('relation_to_deceased', 100);
    table.string('position', 100);

    table.string('password_hash', 255);
    table.string('remember_token', 255);

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
