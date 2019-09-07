exports.up = knex => knex.schema.createTable('lastBatchImportId', table => {
  table.string('tableName').primary();
  table.string('lastId');
});

exports.down = knex => knex.schema.dropTable('lastBatchImportId');
