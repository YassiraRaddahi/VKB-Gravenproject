exports.seed = async function(knex) {
  await knex('graves_dimensions').del();

  await knex('graves_dimensions').insert([
    { id: 1, grave_id: 1, width: 100, length: 200},
    { id: 2, grave_id: 2, width: 80, length: 180},
    { id: 3, grave_id: 3, width: 60, length: 120},
    { id: 4, grave_id: 4, width: 120, length: 220}
  ]);
};