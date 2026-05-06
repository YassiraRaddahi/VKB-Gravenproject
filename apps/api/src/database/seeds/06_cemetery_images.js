exports.seed = async function (knex) {
  await knex('cemetery_images').del();
  await knex('cemetery_images').insert([
    { id: 1, cemetery_id: 1, image_url: '\\images\\cemeteries\\kranenburg.webp' },
    { id: 2, cemetery_id: 2, image_url: '\\images\\cemeteries\\meppelerstraatweg.png' },
    { id: 3, cemetery_id: 3, image_url: '\\images\\cemeteries\\voorst.png' },
    { id: 4, cemetery_id: 4, image_url: '\\images\\cemeteries\\windesheim.png' },
    { id: 5, cemetery_id: 5, image_url: '\\images\\cemeteries\\bergklooster.png' },
    { id: 6, cemetery_id: 6, image_url: '\\images\\cemeteries\\R.K._kerkhof_zwolle.png' },
    { id: 7, cemetery_id: 7, image_url: '\\images\\cemeteries\\kuyerhuislaan.png' },
    { id: 8, cemetery_id: 8, image_url: '\\images\\cemeteries\\het_heilige_kruis.png' },
  ]);
};
