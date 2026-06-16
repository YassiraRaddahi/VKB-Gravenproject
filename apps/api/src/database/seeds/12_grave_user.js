exports.seed = async function (knex) {
  await knex("grave_user").del();
  await knex("grave_user").insert([
    { grave_id: 2, user_id: 2 },
    { grave_id: 2, user_id: 7 },
    { grave_id: 3, user_id: 3 },
    { grave_id: 5, user_id: 5 },
    { grave_id: 1, user_id: 6 },
  ]);
};
