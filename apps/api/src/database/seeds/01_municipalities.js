exports.seed = async function (knex) {
  await knex('municipalities').del();
  await knex('municipalities').insert([
    { id: 1, name: 'Zwolle', remarks: null },
  ]);
};
