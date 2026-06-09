exports.seed = async function(knex) {
  await knex('graves_dimensions').del();

  await knex('graves_dimensions').insert([
    { grave_id: 1, breedte: 100, lengte: 200},
    { grave_id: 2, breedte: 80, lengte: 180},
    { grave_id: 3, breedte: 60, lengte: 120},
    { grave_id: 4, breedte: 120, lengte: 220}
  ]);
};