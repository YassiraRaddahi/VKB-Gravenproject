exports.seed = async function (knex) {
  await knex('cemeteries').del();
  await knex('cemeteries').insert([
    { id: 1, name: 'Kerkhof Kranenburg', address: 'Kranenburgweg 7', zip_code: '8024 AC', city: 'Zwolle', email: 'bb', phone_number: '038 454 4148', website_url: 'https://www.zwolle.nl/begraven-en-cremeren-op-kranenburg', municipalityID: 1 },
    { id: 2, name: 'Kerkhof Meppelerstraatweg', address: 'Meppelerstraatweg', zip_code: '8014 RT', city: 'Zwolle', email: 'info.meppeler@cemetery.nl', website_url: 'https://www.zwolle.nl', municipalityID: 1 },
    { id: 3, name: 'Kerkhof Voorst', address: 'Ridder Zwederlaan 1a', zip_code: '8042 CC', city: 'Zwolle', email: 'contact.voorst@cemetery.nl', municipalityID: 1 },
    { id: 4, name: 'Kerkhof Windesheim', address: 'Pastorieweg', zip_code: '8015 PK', city: 'Zwolle', email: 'beheer.windesheim@cemetery.nl', municipalityID: 1 },
    { id: 5, name: 'Kerkhof Bergklooster', address: 'Bergkloosterweg 92', zip_code: '8034 PL', city: 'Zeist', email: 'info@bergklooster.nl', phone_number: '+31384532281', website_url: 'http://www.bergklooster.nl', municipalityID: 1 },
    { id: 6, name: 'R.K. Kerkhof Zwolle', address: 'Bisschop Willebrandlaan 62', zip_code: '8021 GA', city: 'Zwolle', email: 'admin.rkkerkhof@cemetery.nl', phone_number: '+31384533853', website_url: 'https://www.rkkerkhofzwolle.nl', municipalityID: 1 },
    { id: 7, name: 'Kerkhof Kuyerhuislaan', address: 'Kuyerhuislaan 16', zip_code: '8025 AS', city: 'Zwolle', email: 'info.joods@cemetery.nl', municipalityID: 1 },
    { id: 8, name: 'Kerkhof Het Heilige Kruis', address: 'Buitengasthuisstraat', zip_code: '8011 AG', city: 'Delft', email: 'contact.kruis@cemetery.nl', municipalityID: 1 },
  ]);
};
