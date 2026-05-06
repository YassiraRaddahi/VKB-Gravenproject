exports.seed = async function (knex) {
  await knex('cleanups').del();
  await knex('cleanups').insert([
    { id: 1, grave_id: 1, status: 'volledig', cleaned_at: '2024-01-14 23:00:00', created_at: '2026-03-18 20:01:35', updated_at: '2026-03-18 20:01:35' },
    { id: 2, grave_id: 1, status: 'gedeeltelijk', remarks: 'Onkruid deels verwijderd', cleaned_at: '2024-06-19 22:00:00', created_at: '2026-03-18 20:01:35', updated_at: '2026-03-18 20:01:35' },
    { id: 3, grave_id: 2, status: 'volledig', cleaned_at: '2024-03-09 23:00:00', created_at: '2026-03-18 20:01:35', updated_at: '2026-03-18 20:01:35' },
    { id: 4, grave_id: 3, status: 'niet schoon', remarks: 'Steen te beschadigd om schoon te maken', cleaned_at: '2024-05-04 22:00:00', created_at: '2026-03-18 20:01:35', updated_at: '2026-03-18 20:01:35' },
    { id: 5, grave_id: 4, status: 'volledig', cleaned_at: '2024-08-17 22:00:00', created_at: '2026-03-18 20:01:35', updated_at: '2026-03-18 20:01:35' },
    { id: 6, grave_id: 5, status: 'gedeeltelijk', remarks: 'Grafrecht verlopen, minimaal onderhoud', cleaned_at: '2023-11-29 23:00:00', created_at: '2026-03-18 20:01:35', updated_at: '2026-03-18 20:01:35' },
  ]);
};
