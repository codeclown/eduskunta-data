const request = require('supertest');
const { expect } = require('chai');
const insertIntoDb = require('../../../src/server/utils/insertIntoDb');
const searchFromDb = require('../../../src/server/utils/searchFromDb');

const getDb = require('../../../src/server/db');
const { tables } = require('../../../src/server/schema.json');

describe('searchFromDb', () => {
  let db;
  before(() => {
    db = getDb('testing');
  });
  after(() => db.destroy());

  let trx;
  beforeEach(() => new Promise(resolve => {
    db.transaction(_trx => {
      trx = _trx;
      resolve();
    }).catch(err => {
      // rollback will throw here
    });
  }));
  afterEach(() => trx.rollback());

  it('finds nothing there are no search terms', async () => {
    const table = tables.find(table => table.tableName === 'MemberOfParliament');
    const row = {
      personId: '102',
      lastname: ' Aaltonen',
      firstname: 'Markus',
      party: '',
      minister: 'f',
      XmlData: null,
      XmlDataSv: '<redacted1>',
      XmlDataFi: '<redacted2>'
    };

    await insertIntoDb(trx, table, [row]);

    const results = await searchFromDb(trx, '');
    expect(results).to.deep.equal({
      MemberOfParliament: [],
      SaliDBAanestys: []
    });

    const results2 = await searchFromDb(trx, '  ');
    expect(results2).to.deep.equal({
      MemberOfParliament: [],
      SaliDBAanestys: []
    });
  });

  it('finds members of parliament', async () => {
    const table = tables.find(table => table.tableName === 'MemberOfParliament');
    const row = {
      personId: '102',
      lastname: ' Aaltonen',
      firstname: 'Markus',
      party: '',
      minister: 'f',
      XmlData: null,
      XmlDataSv: '<redacted1>',
      XmlDataFi: '<redacted2>'
    };

    await insertIntoDb(trx, table, [row]);

    const results = await searchFromDb(trx, 'a');
    expect(results).to.deep.equal({
      MemberOfParliament: [
        {
          personId: '102',
          lastname: ' Aaltonen',
          firstname: 'Markus'
        }
      ],
      SaliDBAanestys: []
    });
  });

  it('finds members of parliament regardless of name order and completeness', async () => {
    const table = tables.find(table => table.tableName === 'MemberOfParliament');
    const row = {
      personId: '102',
      lastname: ' Aaltonen',
      firstname: 'Markus',
      party: '',
      minister: 'f',
      XmlData: null,
      XmlDataSv: '<redacted1>',
      XmlDataFi: '<redacted2>'
    };

    await insertIntoDb(trx, table, [row]);

    const results = await searchFromDb(trx, 'markus aaltonen');
    expect(results).to.deep.equal({
      MemberOfParliament: [
        {
          personId: '102',
          lastname: ' Aaltonen',
          firstname: 'Markus'
        }
      ],
      SaliDBAanestys: []
    });

    const results2 = await searchFromDb(trx, 'aalto markus');
    expect(results2).to.deep.equal({
      MemberOfParliament: [
        {
          personId: '102',
          lastname: ' Aaltonen',
          firstname: 'Markus'
        }
      ],
      SaliDBAanestys: []
    });
  });

  it('includes latest past parliament group name and end date', async () => {
    const table = tables.find(table => table.tableName === 'MemberOfParliament');
    const row = {
      personId: '102',
      lastname: ' Aaltonen',
      firstname: 'Markus',
      party: '',
      minister: 'f',
      XmlData: null,
      XmlDataSv: '<redacted1>',
      XmlDataFi: '<redacted2>'
    };

    await trx('parliamentGroups').insert({ groupId: 'foo01', groupName: 'Testiryhmä' });
    // varying order of dates to verify that latest is returned
    await trx('parliamentGroupMemberships').insert({ personId: row.personId, groupId: 'foo01', startDate: new Date('2009-01-01'), endDate: new Date('2009-02-01') });
    await trx('parliamentGroupMemberships').insert({ personId: row.personId, groupId: 'foo01', startDate: new Date('2010-01-01'), endDate: new Date('2010-02-01') });
    await trx('parliamentGroupMemberships').insert({ personId: row.personId, groupId: 'foo01', startDate: new Date('2008-01-01'), endDate: new Date('2008-02-01') });
    await insertIntoDb(trx, table, [row]);

    const results = await searchFromDb(trx, 'a');
    expect(results).to.deep.equal({
      MemberOfParliament: [
        {
          personId: '102',
          lastname: ' Aaltonen',
          firstname: 'Markus',
          lastParliamentGroupId: 'foo01',
          lastParliamentGroupName: 'Testiryhmä',
          lastParliamentEndDate: new Date('2010-02-01')
        }
      ],
      SaliDBAanestys: []
    });
  });

  it('includes ongoing parliament group name and end date', async () => {
    const table = tables.find(table => table.tableName === 'MemberOfParliament');
    const row = {
      personId: '102',
      lastname: ' Aaltonen',
      firstname: 'Markus',
      party: '',
      minister: 'f',
      XmlData: null,
      XmlDataSv: '<redacted1>',
      XmlDataFi: '<redacted2>'
    };

    await trx('parliamentGroups').insert({ groupId: 'foo01', groupName: 'Testiryhmä' });
    // varying order of dates to verify that latest is returned
    await trx('parliamentGroupMemberships').insert({ personId: row.personId, groupId: 'foo01', startDate: new Date('2009-01-01'), endDate: new Date('2009-02-01') });
    await trx('parliamentGroupMemberships').insert({ personId: row.personId, groupId: 'foo01', startDate: new Date('2010-01-01'), endDate: null });
    await trx('parliamentGroupMemberships').insert({ personId: row.personId, groupId: 'foo01', startDate: new Date('2008-01-01'), endDate: new Date('2008-02-01') });
    await insertIntoDb(trx, table, [row]);

    const results = await searchFromDb(trx, 'a');
    expect(results).to.deep.equal({
      MemberOfParliament: [
        {
          personId: '102',
          lastname: ' Aaltonen',
          firstname: 'Markus',
          lastParliamentGroupId: 'foo01',
          lastParliamentGroupName: 'Testiryhmä',
          lastParliamentEndDate: null
        }
      ],
      SaliDBAanestys: []
    });
  });

  it('finds votes', async () => {
    const table = tables.find(table => table.tableName === 'SaliDBAanestys');
    const row = {
      AanestysId: '13265',
      KieliId: '1',
      IstuntoVPVuosi: '1996',
      IstuntoNumero: '124',
      IstuntoPvm: '1996-10-23 00:00:00',
      IstuntoIlmoitettuAlkuaika: '1996-10-23 14:00:00',
      IstuntoAlkuaika: '1996-10-23 14:00:00',
      PJOtsikko: null,
      AanestysNumero: '1',
      AanestysAlkuaika: '1996-10-23 15:40:23',
      AanestysLoppuaika: '1996-10-23 15:40:23',
      AanestysMitatoity: '0',
      AanestysOtsikko: 'Pöydällepano, Pulliainen/Rosendahl',
      AanestysLisaOtsikko: null,
      PaaKohtaTunniste: null,
      PaaKohtaOtsikko: null,
      PaaKohtaHuomautus: null,
      KohtaKasittelyOtsikko: 'Ensimmäinen käsittely',
      KohtaKasittelyVaihe: 'Ensimmäinen käsittely',
      KohtaJarjestys: '1',
      KohtaTunniste: '1',
      KohtaOtsikko: 'Lakialoite laiksi kalastuslain muuttamisesta',
      KohtaHuomautus: null,
      AanestysTulosJaa: '101       ',
      AanestysTulosEi: '26        ',
      AanestysTulosTyhjia: '1         ',
      AanestysTulosPoissa: '71        ',
      AanestysTulosYhteensa: '199       ',
      Url: '/aanestystulos/1/124/1996',
      AanestysPoytakirja: 'PTK 124/1996 vp',
      AanestysPoytakirjaUrl: '/valtiopaivaasiakirjat/PTK+124/1996',
      AanestysValtiopaivaasia: 'LA 4/1995 vp',
      AanestysValtiopaivaasiaUrl: '/valtiopaivaasiat/LA+4/1995',
      AliKohtaTunniste: null,
      Imported: '2018-06-02 10:14:00'
    };

    await insertIntoDb(trx, table, [row]);

    const results = await searchFromDb(trx, 'kala');
    expect(results).to.deep.equal({
      MemberOfParliament: [],
      SaliDBAanestys: [
        {
          AanestysId: '13265',
          KieliId: '1',
          IstuntoVPVuosi: '1996',
          IstuntoNumero: '124',
          IstuntoPvm: new Date('1996-10-23 00:00:00'),
          IstuntoIlmoitettuAlkuaika: new Date('1996-10-23 14:00:00'),
          IstuntoAlkuaika: new Date('1996-10-23 14:00:00'),
          PJOtsikko: null,
          AanestysNumero: '1',
          AanestysAlkuaika: new Date('1996-10-23 15:40:23'),
          AanestysLoppuaika: new Date('1996-10-23 15:40:23'),
          AanestysMitatoity: '0',
          AanestysOtsikko: 'Pöydällepano, Pulliainen/Rosendahl',
          AanestysLisaOtsikko: null,
          PaaKohtaTunniste: null,
          PaaKohtaOtsikko: null,
          PaaKohtaHuomautus: null,
          KohtaKasittelyOtsikko: 'Ensimmäinen käsittely',
          KohtaKasittelyVaihe: 'Ensimmäinen käsittely',
          KohtaJarjestys: '1',
          KohtaTunniste: '1',
          KohtaOtsikko: 'Lakialoite laiksi kalastuslain muuttamisesta',
          KohtaHuomautus: null,
          AanestysTulosJaa: '101       ',
          AanestysTulosEi: '26        ',
          AanestysTulosTyhjia: '1         ',
          AanestysTulosPoissa: '71        ',
          AanestysTulosYhteensa: '199       ',
          Url: '/aanestystulos/1/124/1996',
          AanestysPoytakirja: 'PTK 124/1996 vp',
          AanestysPoytakirjaUrl: '/valtiopaivaasiakirjat/PTK+124/1996',
          AanestysValtiopaivaasia: 'LA 4/1995 vp',
          AanestysValtiopaivaasiaUrl: '/valtiopaivaasiat/LA+4/1995',
          AliKohtaTunniste: null,
          Imported: '2018-06-02 10:14:00'
        }
      ]
    });
  });
});
