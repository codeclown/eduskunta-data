exports.up = knex => knex.schema.createTable('SaliDBAanestysEdustaja', table => {
  table.string('EdustajaId').primary();
  table.string('AanestysId');
  table.string('EdustajaEtunimi');
  table.string('EdustajaSukunimi');
  table.string('EdustajaHenkiloNumero');
  table.string('EdustajaRyhmaLyhenne');
  table.string('EdustajaAanestys');
  table.string('Imported');
}).then(() => knex.schema.createTable('SaliDBAanestysEdustaja_Imported', table => {
  table.string('EdustajaId').primary();
  table.date('Imported');
}));

exports.down = knex => knex.schema.dropTable('SaliDBAanestysEdustaja')
  .then(() => knex.schema.dropTable('SaliDBAanestysEdustaja_Imported'));
