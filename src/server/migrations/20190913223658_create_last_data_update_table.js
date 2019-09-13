exports.up = knex => knex.schema.createTable('lastDataUpdate', table => {
  table.string('key').primary();
  table.datetime('lastDataUpdate');
});

exports.down = knex => knex.schema.dropTable('lastDataUpdate');
