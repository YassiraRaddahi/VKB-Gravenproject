exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');

    table.string('initials', 10).notNullable();
    table.string('first_names', 255).notNullable();
    table.string('infix', 20);
    table.string('last_name', 100).notNullable();

    table.string('partner_infix', 20);
    table.string('partner_last_name', 100);
    table.enu('name_usage', ['eigennaam', 'partnernaam', 'eigennaam_partnernaam', 'partnernaam_eigennaam']).notNullable().defaultTo('eigennaam');

    table.enu('gender', ['man', 'vrouw', 'anders', 'onbekend']).notNullable().defaultTo('onbekend');

    table.date('date_of_birth');
    table.string('place_of_birth', 100);
  
    table.date('date_of_death');
    table.string('place_of_death', 100);

    table.string('street_name', 100);
    table.string('house_number', 10);
    table.string('house_letter', 4);
    table.string('house_number_addition', 10);
    table.string('zip_code', 8);
    table.string('city', 100);

    table.string('email', 255).notNullable().unique();
    table.timestamp('email_verified_at').nullable();
    table.string('email_verification_token', 255).nullable();
    table.timestamp('email_verification_token_expires_at').nullable();

    table.string('phone_number', 15);
    table.string('mobile_number', 15);

    table.string('profile_picture_url', 1024);

    table.string('relation_to_deceased', 100);

    table.string('position', 100);

    table.string('password_hash', 255).notNullable();
    table.string('remember_token', 255);

    table.string('iban_iv', 255);
    table.string('iban_encrypted', 255);
    table.string('iban_owner_name', 100);

    table.timestamps(true, true);
  });
};
 
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};