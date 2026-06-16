module.exports = function (app, knex) {

  // ======================================================
  // GET SETTINGS (ADMIN DEFAULTS PER TYPE)
  // ======================================================
  app.get('/api/settings/grave', async (req, res) => {
    try {

      const rows = await knex('grave_sort');

      const result = {
        'dubbel graf': { width: '', length: '' },
        'enkel graf': { width: '', length: '' },
        'kindergraf': { width: '', length: '' },              
        'keldergraf': { width: '', length: '' },
        'urnengraf': { width: '', length: '' }
      };

      rows.forEach(r => {
        result[r.grave_id] = {
          width: r.width || '',
          length: r.length || ''
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

        const { width, length } = data[type];

        await knex('grave_sort')
          .insert({
            grave_id: type,
            width: width,
            length: length,
            updated_at: knex.fn.now()
          })
          .onConflict('grave_id')
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

const typeSettings = await knex('grave_sort')
  .where({ grave_id: grave.sort })
  .first();

const result = {
  ...grave,
  width: dim?.width ?? typeSettings?.width ?? null,
  length: dim?.length ?? typeSettings?.length ?? null
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
        width,
        length
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
if (req.user?.hasPermission('admin.edit_grave_settings')) {

  await knex('graves_dimensions')
    .insert({
      grave_id: Number(id),
      width: width || null,
      length: length || null,
      updated_at: knex.fn.now()
    })
    .onConflict('grave_id')
    .merge();

}
      res.json({ success: true });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Update failed' });
    }
  });

};