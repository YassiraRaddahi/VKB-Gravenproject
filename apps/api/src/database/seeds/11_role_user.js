exports.seed = async function (knex) {
  await knex('role_user').del();
  await knex('role_user').insert([
    { user_id: 1, role_id: 1, created_at: '2026-03-10 12:13:08', updated_at: '2026-03-10 12:13:08' },
    { user_id: 2, role_id: 2, created_at: '2026-03-10 12:15:33', updated_at: '2026-03-10 12:15:33' },
    { user_id: 3, role_id: 2, created_at: '2026-03-10 12:15:33', updated_at: '2026-03-10 12:15:33' },
    { user_id: 4, role_id: 3, created_at: '2026-03-10 12:28:55', updated_at: '2026-03-10 12:28:55' },
    { user_id: 5, role_id: 3, created_at: '2026-03-10 12:28:55', updated_at: '2026-03-10 12:28:55' },
    { user_id: 6, role_id: 4, created_at: '2026-03-10 12:28:55', updated_at: '2026-03-10 12:28:55' },
    { user_id: 7, role_id: 4, created_at: '2026-03-10 12:28:55', updated_at: '2026-03-10 12:28:55' },
    { user_id: 9, role_id: 2, created_at: '2026-03-17 10:42:39', updated_at: '2026-03-17 10:42:39' },
    { user_id: 10, role_id: 2, created_at: '2026-03-17 10:42:39', updated_at: '2026-03-17 10:42:39' },
    { user_id: 11, role_id: 2, created_at: '2026-03-17 10:42:39', updated_at: '2026-03-17 10:42:39' },
    { user_id: 12, role_id: 2, created_at: '2026-03-17 10:42:39', updated_at: '2026-03-17 10:42:39' },
    { user_id: 13, role_id: 2, created_at: '2026-03-17 10:42:39', updated_at: '2026-03-17 10:42:39' },
    { user_id: 14, role_id: 2, created_at: '2026-03-17 10:42:39', updated_at: '2026-03-17 10:42:39' },
    { user_id: 15, role_id: 4, created_at: '2026-03-17 10:42:39', updated_at: '2026-03-17 10:42:39' },
    { user_id: 16, role_id: 3, created_at: '2026-03-17 10:42:39', updated_at: '2026-03-17 10:42:39' },
  ]);
};
