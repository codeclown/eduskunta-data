const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const getDb = require('../../../src/server/db');
const insertIntoDb = require('../../../src/server/utils/insertIntoDb');
const fillParliamentGroupMembershipsTable = require('../../../src/server/aggregations/fillParliamentGroupMembershipsTable');
const { tables } = require('../../../src/server/schema.json');

const baseMemberInformation = {
  lastname: ' Aaltonen', firstname: 'Markus', party: '', minister: 'f', XmlData: null, XmlDataSv: '<redacted1>'
};

const members = {
  pastMember: {
    memberData: {
      personId: '101',
      ...baseMemberInformation,
      XmlDataFi: fs.readFileSync(path.join(__dirname, '../fixtures/Eduskuntaryhmat-entinen.xml'), 'utf-8')
    },
    expectedMemberships: [
      { personId: '101', groupId: 'sd01', startDate: new Date('1975-09-27'), endDate: new Date('1991-03-21') },
      { personId: '101', groupId: 'sd01', startDate: new Date('1995-03-24'), endDate: new Date('1999-03-23') }
    ]
  },
  currentMember: {
    memberData: {
      personId: '102',
      ...baseMemberInformation,
      XmlDataFi: fs.readFileSync(path.join(__dirname, '../fixtures/Eduskuntaryhmat-nykyinen.xml'), 'utf-8')
    },
    expectedMemberships: [
      { personId: '102', groupId: 'vas01', startDate: new Date('2007-03-21'), endDate: null }
    ]
  },
  pastAndCurrentMember: {
    memberData: {
      personId: '103',
      ...baseMemberInformation,
      XmlDataFi: fs.readFileSync(path.join(__dirname, '../fixtures/Eduskuntaryhmat-nykyinen-ja-entinen.xml'), 'utf-8')
    },
    expectedMemberships: [
      { personId: '103', groupId: 'kok01', startDate: new Date('2015-04-22'), endDate: new Date('2018-04-19') },
      { personId: '103', groupId: 'hh01', startDate: new Date('2018-04-20'), endDate: new Date('2018-04-26') },
      { personId: '103', groupId: 'liik01', startDate: new Date('2018-04-27'), endDate: null }
    ]
  },
  memberWithEntNimiProperty: {
    memberData: {
      personId: '104',
      ...baseMemberInformation,
      XmlDataFi: fs.readFileSync(path.join(__dirname, '../fixtures/Eduskuntaryhmat-EntNimi.xml'), 'utf-8')
    },
    expectedMemberships: [
      { personId: '104', groupId: 'vas01', startDate: new Date('1987-03-21'), endDate: new Date('1995-03-23') }
    ]
  },
  memberMissingAlkuPvm: {
    memberData: {
      personId: '105',
      ...baseMemberInformation,
      XmlDataFi: fs.readFileSync(path.join(__dirname, '../fixtures/Eduskuntaryhmat-missing-AlkuPvm.xml'), 'utf-8')
    },
    expectedMemberships: [
      { personId: '105', groupId: 'kesk01', startDate: new Date('1941-06-20'), endDate: new Date('1945-04-05') },
      { personId: '105', groupId: 'kesk01', startDate: new Date('1949-09-08'), endDate: new Date('1958-07-21') }
    ]
  }
};

describe('fillParliamentGroupMembershipsTable', () => {
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

  const outStream = new require('stream').Writable();
  outStream._write = (chunk, enc, next) => next();

  const table = tables.find(table => table.tableName === 'MemberOfParliament');

  it('fills tables parliamentGroupMemberships and parliamentGroups as expected', async () => {
    await insertIntoDb(trx, table, Object.values(members).map(item => item.memberData));
    await fillParliamentGroupMembershipsTable(trx, outStream);

    for (let key in members) {
      const { memberData, expectedMemberships } = members[key];
      const memberships = await trx('parliamentGroupMemberships').where('personId', memberData.personId).orderBy('startDate', 'asc');
      expect(memberships).to.deep.equal(expectedMemberships);
    }

    const parliamentGroups = await trx('parliamentGroups').orderBy('groupId');
    expect(parliamentGroups).to.deep.equal([
      { groupId: 'hh01', groupName: 'edustaja Harkimo' },
      { groupId: 'kesk01', groupName: 'Maalaisliiton eduskuntaryhmä' },
      { groupId: 'kok01', groupName: 'Kansallisen kokoomuksen eduskuntaryhmä' },
      { groupId: 'liik01', groupName: 'Liike Nyt -eduskuntaryhmä' },
      { groupId: 'sd01', groupName: 'Sosialidemokraattinen eduskuntaryhmä' },
      { groupId: 'vas01', groupName: 'Vasemmistoliiton eduskuntaryhmä' }
    ]);
  });

  it('truncates previous data on each run', async () => {
    await insertIntoDb(trx, table, [
      members.pastMember.memberData
    ]);
    await fillParliamentGroupMembershipsTable(trx, outStream);
    expect(await trx('parliamentGroupMemberships').orderBy('startDate', 'asc')).to.deep.equal(members.pastMember.expectedMemberships);
    expect(await trx('parliamentGroups').orderBy('groupId')).to.deep.equal([
      { groupId: 'sd01', groupName: 'Sosialidemokraattinen eduskuntaryhmä' }
    ]);

    // change it up

    await trx('MemberOfParliament').truncate();
    await insertIntoDb(trx, table, [
      members.currentMember.memberData
    ]);
    await fillParliamentGroupMembershipsTable(trx, outStream);
    expect(await trx('parliamentGroupMemberships').orderBy('startDate', 'asc')).to.deep.equal(members.currentMember.expectedMemberships);
    expect(await trx('parliamentGroups').orderBy('groupId')).to.deep.equal([
      { groupId: 'vas01', groupName: 'Vasemmistoliiton eduskuntaryhmä' }
    ]);
  });
});
