exports.up = function (knex) {
  return knex.schema.createTable("grave_tariffs", (table) => {
    table.increments("id");
    table
      .integer("cemetery_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("cemeteries")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .enu("contract_type", [
        "eerste uitgifte",
        "verlenging",
        "onbepaalde tijd",
      ])
      .notNullable();
    table
      .enu("sort", [
        "dubbel graf",
        "enkel graf",
        "kindergraf",
        "urnengraf",
        "keldergraf",
      ])
      .nullable()
      .defaultTo(null);
    table.integer("duration_years").unsigned().nullable().defaultTo(null);
    table.decimal("burial_right", 10, 2).notNullable().defaultTo(0);
    table.decimal("maintenance", 10, 2).notNullable().defaultTo(0);
    table.decimal("additional_interment", 10, 2).notNullable().defaultTo(0);
    table.integer("valid_from_year").notNullable();
    table.integer("valid_to_year").nullable().defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("grave_tariffs");
};
