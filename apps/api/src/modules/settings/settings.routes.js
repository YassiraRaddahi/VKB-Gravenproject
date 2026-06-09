// routes/settings.js
router.put('/settings/grave', async (req, res) => {
  const data = req.body;

  try {
    // mapping van keys naar grave_id
    const mapping = {
      dubbel: 1,
      enkel: 2,
      kind: 3,
      kelder: 4
    };

    for (const key of Object.keys(data)) {
      const grave = data[key];
      const grave_id = mapping[key];

      if (!grave_id) continue;

      // check of record al bestaat
      const existing = await knex('grave_dimensions')
        .where({ grave_id })
        .first();

      if (existing) {
        // update
        await knex('grave_dimensions')
          .where({ grave_id })
          .update({
            breedte: grave.breedte,
            lengte: grave.lengte,
            updated_at: knex.fn.now()
          });
      } else {
        // insert
        await knex('grave_dimensions').insert({
          grave_id,
          breedte: grave.breedte,
          lengte: grave.lengte
        });
      }
    }

    res.json({ message: 'Opgeslagen!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fout bij opslaan' });
  }
});