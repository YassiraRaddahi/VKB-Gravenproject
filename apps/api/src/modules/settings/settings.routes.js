module.exports = function (app, knex) {

  // ======================================================
  // GET SETTINGS (ADMIN DEFAULTS PER TYPE)
  // ======================================================
  app.get('/api/settings/grave', async (req, res) => {
    try {

      const rows = await knex('grave_type_settings');

      const result = {
        'dubbel graf': { breedte: '', lengte: '' },
        'enkel graf': { breedte: '', lengte: '' },
        'kindergraf': { breedte: '', lengte: '' },
        'keldergraf': { breedte: '', lengte: '' }
      };

      rows.forEach(r => {
        result[r.type] = {
          breedte: r.breedte_default || '',
          lengte: r.lengte_default || ''
        };
      });

      res.json(result);

    } catch (error) {
      console.error('Fout bij ophalen settings:', error);
      res.status(500).json({ error: 'Fout bij ophalen settings' });
    }
  });


  // ======================================================
  // PUT SETTINGS (ADMIN DEFAULTS SAVE)
  // ======================================================
  app.put('/api/settings/grave', async (req, res) => {

    try {
      const data = req.body;

      for (const type of Object.keys(data)) {

        const { breedte, lengte } = data[type];

        await knex('grave_type_settings')
          .insert({
            type,
            breedte_default: breedte,
            lengte_default: lengte,
            updated_at: knex.fn.now()
          })
          .onConflict('type')
          .merge();
      }

      res.json({ message: 'Settings opgeslagen' });

    } catch (error) {
      console.error('Fout bij opslaan settings:', error);
      res.status(500).json({ error: 'Fout bij opslaan settings' });
    }
  });


  // ======================================================
  // GET SINGLE GRAVE (WITH FALLBACK LOGIC)
  // ======================================================
  app.get('/api/graves/:grave_id', async (req, res) => {

    try {

      const grave = await knex('graves')
        .where({ id: req.params.grave_id })
        .first();

      if (!grave) {
        return res.status(404).json({ error: 'Grave not found' });
      }

      const dim = await knex('graves_dimensions')
        .where({ grave_id: grave.id })
        .first();

      const typeSettings = await knex('grave_type_settings')
        .where({ type: grave.type })
        .first();

      const result = {
        ...grave,
        breedte: dim?.breedte ?? typeSettings?.breedte_default ?? null,
        lengte: dim?.lengte ?? typeSettings?.lengte_default ?? null
      };

      res.json({ grave: result });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database error' });
    }
  });


  // ======================================================
  // UPDATE GRAVE + OVERRIDE DIMENSIONS
  // ======================================================
  app.put('/api/graves/:grave_id', async (req, res) => {

    try {

      const id = req.params.grave_id;

      const {
        grave_number,
        type,
        sort,
        status,
        remarks,
        breedte,
        lengte
      } = req.body;

      // 1. update basis info
      await knex('graves')
        .where({ id })
        .update({
          grave_number,
          type,
          sort,
          status,
          remarks
        });

      // 2. upsert override
      await knex('graves_dimensions')
        .insert({
          grave_id: id,
          breedte,
          lengte,
          updated_at: knex.fn.now()
        })
        .onConflict('grave_id')
        .merge();

      res.json({ success: true });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Update failed' });
    }
  });

};