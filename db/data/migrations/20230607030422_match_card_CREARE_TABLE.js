/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("match_card", (table) => {
    table.increments("id").primary();
    table.text("situation").notNullable();
    table.integer("date").notNullable();
    table.string("color", 64);
    table.string("user1", 64);
    table.string("user2", 64);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("match_card");
};
