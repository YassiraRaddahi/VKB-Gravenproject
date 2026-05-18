exports.seed = async function (knex) {
  await knex('role_user').del();

  await knex('role_user').insert([
    { user_id: 1, role_id: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 2, role_id: 2, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 3, role_id: 2, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 4, role_id: 3, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 5, role_id: 3, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 6, role_id: 4, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 7, role_id: 4, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 9, role_id: 2, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 10, role_id: 2, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 11, role_id: 2, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 12, role_id: 2, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 13, role_id: 2, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 14, role_id: 2, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 15, role_id: 4, created_at: knex.fn.now(), updated_at: knex.fn.now() },
    { user_id: 16, role_id: 3, created_at: knex.fn.now(), updated_at: knex.fn.now() },
  ]);
};