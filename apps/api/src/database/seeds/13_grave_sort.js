exports.seed = async function (knex) {
  await knex('grave_sort').del();

  await knex('grave_sort').insert([
    {
      id: 1,
      grave_id: 'dubbel graf',
      width: 100,
      length: 200
    },
    {
      id: 2,
      grave_id: 'enkel graf',
      width: 80,
      length: 180
    },
    {
      id: 3,                      
      grave_id: 'kindergraf',
      width: 60,
      length: 120
    },
    {
      id: 4,
      grave_id: 'keldergraf',
      width: 120,
      length: 220
    },
    {
      id: 5,
      grave_id: 'urnengraf',
      width: 0,
      length: 0
    }
  ]);
};