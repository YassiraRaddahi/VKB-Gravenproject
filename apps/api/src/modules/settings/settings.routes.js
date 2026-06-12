module.exports = function (app, knex) {

  // GET /settings/grave - Ophalen van grave dimensions
  app.get('/api/settings/grave', async (req, res) => {
    try {
      const mapping = {
        dubbel: 1,
        enkel: 2,
        kind: 3,
        kelder: 4
      };

      const result = {
        dubbel: { breedte: '', lengte: '' },
        enkel: { breedte: '', lengte: '' },
        kind: { breedte: '', lengte: '' },
        kelder: { breedte: '', lengte: '' }
      };

      for (const [key, grave_id] of Object.entries(mapping)) {
        const dimension = await knex('graves_dimensions')
          .where({ grave_id })
          .first();

        if (dimension) {
          result[key] = {
            breedte: dimension.breedte || '',
            lengte: dimension.lengte || ''
          };
        }
      }

      res.json(result);
    } catch (error) {
      console.error('Fout bij ophalen grave settings:', error);
      res.status(500).json({ error: 'Fout bij ophalen grave settings' });
    }
  });

  // PUT /api/settings/grave - Opslaan van grave dimensions
  app.put('/api/settings/grave', async (req, res) => {
    const data = req.body;

    try {
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

        // Check of record al bestaat
        const existing = await knex('graves_dimensions')
          .where({ grave_id })
          .first();

        if (existing) {
          // Update
          await knex('graves_dimensions')
            .where({ grave_id })
            .update({
              breedte: grave.breedte,
              lengte: grave.lengte,
              updated_at: knex.fn.now()
            });
        } else {
          // Insert
          await knex('graves_dimensions').insert({
            grave_id,
            breedte: grave.breedte,
            lengte: grave.lengte,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
          });
        }
      }

      res.json({ message: 'Opgeslagen!' });
    } catch (error) {
      console.error('Fout bij opslaan grave settings:', error);
      res.status(500).json({ error: 'Fout bij opslaan grave settings' });
    }
  });
};