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
      MemberOfParliament: []
    });

    const results2 = await searchFromDb(trx, '  ');
    expect(results2).to.deep.equal({
      MemberOfParliament: []
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
      MemberOfParliament: [row]
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
      MemberOfParliament: [row]
    });

    const results2 = await searchFromDb(trx, 'aalto markus');
    expect(results2).to.deep.equal({
      MemberOfParliament: [row]
    });
  });
});
