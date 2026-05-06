exports.seed = async function (knex) {
  await knex('roles').del();
  await knex('roles').insert([
    { id: 1, name: 'admin' },
    { id: 2, name: 'beheerder' },
    { id: 3, name: 'rechthebbende' },
    { id: 4, name: 'grafonderhouder' },
  ]);
};
