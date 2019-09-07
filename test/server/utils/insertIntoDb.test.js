const request = require('supertest');
const { expect } = require('chai');
const insertIntoDb = require('../../../src/server/utils/insertIntoDb');

const getDb = require('../../../src/server/db');
const { tables } = require('../../../src/server/schema.json');

describe('insertIntoDb', () => {
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

  it('inserts rows to table', async () => {
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

    expect(await trx('MemberOfParliament')).to.deep.equal([
      row
    ]);
  });

  it('inserts rows to table and datetime tables', async () => {
    const table = tables.find(table => table.tableName === 'VaskiData');
    const row = {
      Id: '10',
      XmlData: '<redacted1>',
      Status: '5',
      Created: '2017-02-02 12:36:15',
      Eduskuntatunnus: 'AM 13/2015 rd',
      AttachmentGroupId: null,
      Imported: '2018-06-04 20:57:34.887658'
    };

    await insertIntoDb(trx, table, [row]);

    expect(await trx('VaskiData')).to.deep.equal([
      row
    ]);
    expect(await trx('VaskiData__DateTime__Created')).to.deep.equal([
      {
        Id: '10',
        Created: new Date('2017-02-02 12:36:15')
      }
    ]);
    expect(await trx('VaskiData__DateTime__Imported')).to.deep.equal([
      {
        Id: '10',
        Imported: new Date('2018-06-04 20:57:34.887658')
      }
    ]);
  });
});
