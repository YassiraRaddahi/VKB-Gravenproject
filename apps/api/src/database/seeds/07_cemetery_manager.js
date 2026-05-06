exports.seed = async function (knex) {
  await knex('cemetery_manager').del();
  await knex('cemetery_manager').insert([
    { user_id: 2, cemetery_id: 1 },
    { user_id: 3, cemetery_id: 1 },
    { user_id: 9, cemetery_id: 3 },
    { user_id: 10, cemetery_id: 4 },
    { user_id: 11, cemetery_id: 5 },
    { user_id: 12, cemetery_id: 6 },
    { user_id: 13, cemetery_id: 7 },
    { user_id: 14, cemetery_id: 8 },
    { user_id: 15, cemetery_id: 2 },
    { user_id: 16, cemetery_id: 2 },
  ]);
};
