// This file was auto-generated
// @see <project_root>/bin/create-base-migration

exports.up = knex => Promise.all([
  knex.schema.createTable('Attachment', table => {
    table.string('Id').primary();
    table.text('AttachmentGroupId');
    table.text('Url');
    table.string('Imported');
  }),
  knex.schema.createTable('Attachment__DateTime__Imported', table => {
    table.string('Id').primary();
    table.datetime('Imported');
  }),
  knex.schema.createTable('AttachmentGroup', table => {
    table.string('Id').primary();
    table.string('Imported');
  }),
  knex.schema.createTable('AttachmentGroup__DateTime__Imported', table => {
    table.string('Id').primary();
    table.datetime('Imported');
  }),
  knex.schema.createTable('MemberOfParliament', table => {
    table.string('personId').primary();
    table.text('lastname');
    table.text('firstname');
    table.text('party');
    table.text('minister');
    table.text('XmlData');
    table.text('XmlDataSv');
    table.text('XmlDataFi');
    table.text('XmlDataEn');
  }),
  knex.schema.createTable('SaliDBAanestys', table => {
    table.string('AanestysId').primary();
    table.text('KieliId');
    table.text('IstuntoVPVuosi');
    table.text('IstuntoNumero');
    table.string('IstuntoPvm');
    table.string('IstuntoIlmoitettuAlkuaika');
    table.string('IstuntoAlkuaika');
    table.text('PJOtsikko');
    table.text('AanestysNumero');
    table.string('AanestysAlkuaika');
    table.string('AanestysLoppuaika');
    table.text('AanestysMitatoity');
    table.text('AanestysOtsikko');
    table.text('AanestysLisaOtsikko');
    table.text('PaaKohtaTunniste');
    table.text('PaaKohtaOtsikko');
    table.text('PaaKohtaHuomautus');
    table.text('KohtaKasittelyOtsikko');
    table.text('KohtaKasittelyVaihe');
    table.text('KohtaJarjestys');
    table.text('KohtaTunniste');
    table.text('KohtaOtsikko');
    table.text('KohtaHuomautus');
    table.text('AanestysTulosJaa');
    table.text('AanestysTulosEi');
    table.text('AanestysTulosTyhjia');
    table.text('AanestysTulosPoissa');
    table.text('AanestysTulosYhteensa');
    table.text('Url');
    table.text('AanestysPoytakirja');
    table.text('AanestysPoytakirjaUrl');
    table.text('AanestysValtiopaivaasia');
    table.text('AanestysValtiopaivaasiaUrl');
    table.text('AliKohtaTunniste');
    table.string('Imported');
  }),
  knex.schema.createTable('SaliDBAanestys__DateTime__IstuntoPvm', table => {
    table.string('AanestysId').primary();
    table.datetime('IstuntoPvm');
  }),
  knex.schema.createTable('SaliDBAanestys__DateTime__IstuntoIlmoitettuAlkuaika', table => {
    table.string('AanestysId').primary();
    table.datetime('IstuntoIlmoitettuAlkuaika');
  }),
  knex.schema.createTable('SaliDBAanestys__DateTime__IstuntoAlkuaika', table => {
    table.string('AanestysId').primary();
    table.datetime('IstuntoAlkuaika');
  }),
  knex.schema.createTable('SaliDBAanestys__DateTime__AanestysAlkuaika', table => {
    table.string('AanestysId').primary();
    table.datetime('AanestysAlkuaika');
  }),
  knex.schema.createTable('SaliDBAanestys__DateTime__AanestysLoppuaika', table => {
    table.string('AanestysId').primary();
    table.datetime('AanestysLoppuaika');
  }),
  knex.schema.createTable('SaliDBAanestys__DateTime__Imported', table => {
    table.string('AanestysId').primary();
    table.datetime('Imported');
  }),
  knex.schema.createTable('SaliDBAanestysAsiakirja', table => {
    table.string('AsiakirjaId').primary();
    table.text('AanestysId');
    table.text('Asiakirja');
    table.text('AsiakirjaUrl');
    table.string('Imported');
  }),
  knex.schema.createTable('SaliDBAanestysAsiakirja__DateTime__Imported', table => {
    table.string('AsiakirjaId').primary();
    table.datetime('Imported');
  }),
  knex.schema.createTable('SaliDBAanestysEdustaja', table => {
    table.string('EdustajaId').primary();
    table.text('AanestysId');
    table.text('EdustajaEtunimi');
    table.text('EdustajaSukunimi');
    table.text('EdustajaHenkiloNumero');
    table.text('EdustajaRyhmaLyhenne');
    table.text('EdustajaAanestys');
    table.string('Imported');
  }),
  knex.schema.createTable('SaliDBAanestysEdustaja__DateTime__Imported', table => {
    table.string('EdustajaId').primary();
    table.datetime('Imported');
  }),
  knex.schema.createTable('SaliDBAanestysJakauma', table => {
    table.string('JakaumaId').primary();
    table.text('AanestysId');
    table.text('Ryhma');
    table.text('Jaa');
    table.text('Ei');
    table.text('Tyhjia');
    table.text('Poissa');
    table.text('Yhteensa');
    table.text('Tyyppi');
    table.string('Imported');
  }),
  knex.schema.createTable('SaliDBAanestysJakauma__DateTime__Imported', table => {
    table.string('JakaumaId').primary();
    table.datetime('Imported');
  }),
  knex.schema.createTable('SaliDBAanestysKieli', table => {
    table.string('KieliId').primary();
    table.text('Kieli');
    table.string('Imported');
  }),
  knex.schema.createTable('SaliDBAanestysKieli__DateTime__Imported', table => {
    table.string('KieliId').primary();
    table.datetime('Imported');
  }),
  knex.schema.createTable('SaliDBIstunto', table => {
    table.string('Id').primary();
    table.text('TekninenAvain');
    table.text('IstuntoTyyppi');
    table.text('IstuntoTila');
    table.text('IstuntoTilaSeliteFI');
    table.text('IstuntoTilaSeliteSV');
    table.text('IstuntoVPVuosi');
    table.text('IstuntoNumero');
    table.string('IstuntoPvm');
    table.string('IstuntoIlmoitettuAlkuaika');
    table.string('IstuntoAlkuaika');
    table.text('IstuntoLoppuaika');
    table.text('IstuntoNimenhuutoaika');
    table.text('KasiteltavaKohtaTekninenAvain');
    table.text('PJTekninenAvain');
    table.text('PJOtsikkoFI');
    table.text('PJOtsikkoSV');
    table.text('PJTila');
    table.text('XmlData');
    table.string('Created');
    table.string('Modified');
    table.text('PuhujaHenkilonumero');
    table.text('ManuaalinenEsto');
    table.text('AttachmentGroupId');
    table.string('Imported');
  }),
  knex.schema.createTable('SaliDBIstunto__DateTime__IstuntoPvm', table => {
    table.string('Id').primary();
    table.datetime('IstuntoPvm');
  }),
  knex.schema.createTable('SaliDBIstunto__DateTime__IstuntoIlmoitettuAlkuaika', table => {
    table.string('Id').primary();
    table.datetime('IstuntoIlmoitettuAlkuaika');
  }),
  knex.schema.createTable('SaliDBIstunto__DateTime__IstuntoAlkuaika', table => {
    table.string('Id').primary();
    table.datetime('IstuntoAlkuaika');
  }),
  knex.schema.createTable('SaliDBIstunto__DateTime__Created', table => {
    table.string('Id').primary();
    table.datetime('Created');
  }),
  knex.schema.createTable('SaliDBIstunto__DateTime__Modified', table => {
    table.string('Id').primary();
    table.datetime('Modified');
  }),
  knex.schema.createTable('SaliDBIstunto__DateTime__Imported', table => {
    table.string('Id').primary();
    table.datetime('Imported');
  }),
  knex.schema.createTable('SaliDBKohta', table => {
    table.string('Id').primary();
    table.text('IstuntoTekninenAvain');
    table.text('TekninenAvain');
    table.text('VaskiID');
    table.text('PuheenvuoroTyyppiOletus');
    table.text('PJKohtaTunnus');
    table.text('Jarjestysnumero');
    table.text('Tunniste');
    table.text('VoikoPyytaaPV');
    table.text('OtsikkoFI');
    table.text('OtsikkoSV');
    table.text('HuomautusFI');
    table.text('HuomautuSV');
    table.text('PaatosFI');
    table.text('PaatosSV');
    table.text('XmlData');
    table.string('Created');
    table.string('Modified');
    table.text('KasittelyotsikkoFI');
    table.text('KasittelyotsikkoSV');
    table.string('Imported');
  }),
  knex.schema.createTable('SaliDBKohta__DateTime__Created', table => {
    table.string('Id').primary();
    table.datetime('Created');
  }),
  knex.schema.createTable('SaliDBKohta__DateTime__Modified', table => {
    table.string('Id').primary();
    table.datetime('Modified');
  }),
  knex.schema.createTable('SaliDBKohta__DateTime__Imported', table => {
    table.string('Id').primary();
    table.datetime('Imported');
  }),
  knex.schema.createTable('SaliDBKohtaAanestys', table => {
    table.string('Id').primary();
    table.text('IstuntoTekninenAvain');
    table.text('KohtaTekninenAvain');
    table.text('Aanestysnumero');
    table.string('Created');
    table.string('Modified');
    table.string('Imported');
  }),
  knex.schema.createTable('SaliDBKohtaAanestys__DateTime__Created', table => {
    table.string('Id').primary();
    table.datetime('Created');
  }),
  knex.schema.createTable('SaliDBKohtaAanestys__DateTime__Modified', table => {
    table.string('Id').primary();
    table.datetime('Modified');
  }),
  knex.schema.createTable('SaliDBKohtaAanestys__DateTime__Imported', table => {
    table.string('Id').primary();
    table.datetime('Imported');
  }),
  knex.schema.createTable('SaliDBKohtaAsiakirja', table => {
    table.string('Id').primary();
    table.text('KohtaTekninenAvain');
    table.text('TekninenAvain');
    table.text('NimiFI');
    table.text('LinkkiTekstiFI');
    table.text('LinkkiUrlFI');
    table.text('NimiSV');
    table.text('LinkkiTekstiSV');
    table.text('LinkkiUrlSV');
    table.string('Created');
    table.string('Modified');
    table.string('Imported');
  }),
  knex.schema.createTable('SaliDBKohtaAsiakirja__DateTime__Created', table => {
    table.string('Id').primary();
    table.datetime('Created');
  }),
  knex.schema.createTable('SaliDBKohtaAsiakirja__DateTime__Modified', table => {
    table.string('Id').primary();
    table.datetime('Modified');
  }),
  knex.schema.createTable('SaliDBKohtaAsiakirja__DateTime__Imported', table => {
    table.string('Id').primary();
    table.datetime('Imported');
  }),
  knex.schema.createTable('SaliDBPuheenvuoro', table => {
    table.string('Id').primary();
    table.text('IstuntoTekninenAvain');
    table.text('KohtaTekninenAvain');
    table.text('TekninenAvain');
    table.string('Jarjestys');
    table.text('PVTyyppi');
    table.text('henkilonumero');
    table.text('Etunimi');
    table.text('Sukunimi');
    table.text('Sukupuoli');
    table.text('PyyntoTapa');
    table.string('PyyntoAika');
    table.text('XmlData');
    table.string('Created');
    table.string('Modified');
    table.text('RyhmaLyhenneFI');
    table.text('RyhmaLyhenneSV');
    table.text('Puhunut');
    table.text('JarjestysNro');
    table.text('ADtunnus');
    table.text('MinisteriysFI');
    table.text('MinisteriysSV');
    table.string('Imported');
  }),
  knex.schema.createTable('SaliDBPuheenvuoro__DateTime__Jarjestys', table => {
    table.string('Id').primary();
    table.datetime('Jarjestys');
  }),
  knex.schema.createTable('SaliDBPuheenvuoro__DateTime__PyyntoAika', table => {
    table.string('Id').primary();
    table.datetime('PyyntoAika');
  }),
  knex.schema.createTable('SaliDBPuheenvuoro__DateTime__Created', table => {
    table.string('Id').primary();
    table.datetime('Created');
  }),
  knex.schema.createTable('SaliDBPuheenvuoro__DateTime__Modified', table => {
    table.string('Id').primary();
    table.datetime('Modified');
  }),
  knex.schema.createTable('SaliDBPuheenvuoro__DateTime__Imported', table => {
    table.string('Id').primary();
    table.datetime('Imported');
  }),
  knex.schema.createTable('SaliDBTiedote', table => {
    table.string('Id').primary();
    table.text('TekninenAvain');
    table.text('IstuntoTekninenAvain');
    table.text('KohtaTekninenAvain');
    table.text('TiedoteTyyppi');
    table.text('TiedoteTekstiFI');
    table.text('TiedoteTekstiSV');
    table.text('TiedoteVoimassaolo');
    table.text('TiedoteLahetetty');
    table.string('Created');
    table.string('Modified');
    table.string('Imported');
  }),
  knex.schema.createTable('SaliDBTiedote__DateTime__Created', table => {
    table.string('Id').primary();
    table.datetime('Created');
  }),
  knex.schema.createTable('SaliDBTiedote__DateTime__Modified', table => {
    table.string('Id').primary();
    table.datetime('Modified');
  }),
  knex.schema.createTable('SaliDBTiedote__DateTime__Imported', table => {
    table.string('Id').primary();
    table.datetime('Imported');
  }),
  knex.schema.createTable('SeatingOfParliament', table => {
    table.text('hetekaId');
    table.string('seatNumber').primary();
    table.text('lastname');
    table.text('firstname');
    table.text('party');
    table.text('minister');
  }),
  knex.schema.createTable('VaskiData', table => {
    table.string('Id').primary();
    table.text('XmlData');
    table.text('Status');
    table.string('Created');
    table.text('Eduskuntatunnus');
    table.text('AttachmentGroupId');
    table.string('Imported');
  }),
  knex.schema.createTable('VaskiData__DateTime__Created', table => {
    table.string('Id').primary();
    table.datetime('Created');
  }),
  knex.schema.createTable('VaskiData__DateTime__Imported', table => {
    table.string('Id').primary();
    table.datetime('Imported');
  })
]);

exports.down = knex => Promise.all([
  knex.schema.dropTable('Attachment'),
  knex.schema.dropTable('Attachment__DateTime__Imported'),
  knex.schema.dropTable('AttachmentGroup'),
  knex.schema.dropTable('AttachmentGroup__DateTime__Imported'),
  knex.schema.dropTable('MemberOfParliament'),
  knex.schema.dropTable('SaliDBAanestys'),
  knex.schema.dropTable('SaliDBAanestys__DateTime__IstuntoPvm'),
  knex.schema.dropTable('SaliDBAanestys__DateTime__IstuntoIlmoitettuAlkuaika'),
  knex.schema.dropTable('SaliDBAanestys__DateTime__IstuntoAlkuaika'),
  knex.schema.dropTable('SaliDBAanestys__DateTime__AanestysAlkuaika'),
  knex.schema.dropTable('SaliDBAanestys__DateTime__AanestysLoppuaika'),
  knex.schema.dropTable('SaliDBAanestys__DateTime__Imported'),
  knex.schema.dropTable('SaliDBAanestysAsiakirja'),
  knex.schema.dropTable('SaliDBAanestysAsiakirja__DateTime__Imported'),
  knex.schema.dropTable('SaliDBAanestysEdustaja'),
  knex.schema.dropTable('SaliDBAanestysEdustaja__DateTime__Imported'),
  knex.schema.dropTable('SaliDBAanestysJakauma'),
  knex.schema.dropTable('SaliDBAanestysJakauma__DateTime__Imported'),
  knex.schema.dropTable('SaliDBAanestysKieli'),
  knex.schema.dropTable('SaliDBAanestysKieli__DateTime__Imported'),
  knex.schema.dropTable('SaliDBIstunto'),
  knex.schema.dropTable('SaliDBIstunto__DateTime__IstuntoPvm'),
  knex.schema.dropTable('SaliDBIstunto__DateTime__IstuntoIlmoitettuAlkuaika'),
  knex.schema.dropTable('SaliDBIstunto__DateTime__IstuntoAlkuaika'),
  knex.schema.dropTable('SaliDBIstunto__DateTime__Created'),
  knex.schema.dropTable('SaliDBIstunto__DateTime__Modified'),
  knex.schema.dropTable('SaliDBIstunto__DateTime__Imported'),
  knex.schema.dropTable('SaliDBKohta'),
  knex.schema.dropTable('SaliDBKohta__DateTime__Created'),
  knex.schema.dropTable('SaliDBKohta__DateTime__Modified'),
  knex.schema.dropTable('SaliDBKohta__DateTime__Imported'),
  knex.schema.dropTable('SaliDBKohtaAanestys'),
  knex.schema.dropTable('SaliDBKohtaAanestys__DateTime__Created'),
  knex.schema.dropTable('SaliDBKohtaAanestys__DateTime__Modified'),
  knex.schema.dropTable('SaliDBKohtaAanestys__DateTime__Imported'),
  knex.schema.dropTable('SaliDBKohtaAsiakirja'),
  knex.schema.dropTable('SaliDBKohtaAsiakirja__DateTime__Created'),
  knex.schema.dropTable('SaliDBKohtaAsiakirja__DateTime__Modified'),
  knex.schema.dropTable('SaliDBKohtaAsiakirja__DateTime__Imported'),
  knex.schema.dropTable('SaliDBPuheenvuoro'),
  knex.schema.dropTable('SaliDBPuheenvuoro__DateTime__Jarjestys'),
  knex.schema.dropTable('SaliDBPuheenvuoro__DateTime__PyyntoAika'),
  knex.schema.dropTable('SaliDBPuheenvuoro__DateTime__Created'),
  knex.schema.dropTable('SaliDBPuheenvuoro__DateTime__Modified'),
  knex.schema.dropTable('SaliDBPuheenvuoro__DateTime__Imported'),
  knex.schema.dropTable('SaliDBTiedote'),
  knex.schema.dropTable('SaliDBTiedote__DateTime__Created'),
  knex.schema.dropTable('SaliDBTiedote__DateTime__Modified'),
  knex.schema.dropTable('SaliDBTiedote__DateTime__Imported'),
  knex.schema.dropTable('SeatingOfParliament'),
  knex.schema.dropTable('VaskiData'),
  knex.schema.dropTable('VaskiData__DateTime__Created'),
  knex.schema.dropTable('VaskiData__DateTime__Imported')
]);
