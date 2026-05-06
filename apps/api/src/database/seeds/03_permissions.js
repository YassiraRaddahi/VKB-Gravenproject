exports.seed = async function (knex) {
  await knex('permissions').del();
  await knex('permissions').insert([
    { id: 1, name: 'beheerder.aanmaken' },
    { id: 2, name: 'beheerder.aanpassen' },
    { id: 3, name: 'beheerder.verwijderen' },
    { id: 4, name: 'begraafplaats.aanmaken' },
    { id: 5, name: 'begraafplaats.aanpassen' },
    { id: 6, name: 'rechthebbende.aanmaken' },
    { id: 7, name: 'rechthebbende.aanpassen' },
    { id: 8, name: 'rechthebbende.verwijderen' },
    { id: 9, name: 'overledene.aanmaken' },
    { id: 10, name: 'overledene.aanpassen' },
    { id: 11, name: 'overledene.verwijderen' },
    { id: 12, name: 'graf.aanmaken' },
    { id: 13, name: 'graf.aanpassen' },
    { id: 14, name: 'graf.koppelen' },
    { id: 15, name: 'grafonderhouder.aanmaken' },
    { id: 16, name: 'grafonderhouder.aanpassen' },
    { id: 17, name: 'grafonderhouder.verwijderen' },
    { id: 18, name: 'eigen.graven.bekijken' },
    { id: 19, name: 'eigen.facturen.bekijken' },
    { id: 20, name: 'onderhoud.graven.bekijken' },
  ]);
};
