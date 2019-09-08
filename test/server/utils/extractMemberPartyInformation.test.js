const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const extractMemberPartyInformation = require('../../../src/server/utils/extractMemberPartyInformation');

describe('extractMemberPartyInformation', () => {
  it('parses former member of parliament', () => {
    const XmlDataFi = fs.readFileSync(path.join(__dirname, '../fixtures/Eduskuntaryhmat-entinen.xml'), 'utf-8');
    expect(extractMemberPartyInformation(XmlDataFi)).to.deep.equal([
      {
        groupName: 'Sosialidemokraattinen eduskuntaryhmä',
        groupId: 'sd01',
        startDate: new Date('1975-09-27'),
        endDate: new Date('1991-03-21')
      },
      {
        groupName: 'Sosialidemokraattinen eduskuntaryhmä',
        groupId: 'sd01',
        startDate: new Date('1995-03-24'),
        endDate: new Date('1999-03-23')
      }
    ]);
  });

  it('parses current member of parliament', () => {
    const XmlDataFi = fs.readFileSync(path.join(__dirname, '../fixtures/Eduskuntaryhmat-nykyinen.xml'), 'utf-8');
    expect(extractMemberPartyInformation(XmlDataFi)).to.deep.equal([
      {
        groupName: 'Vasemmistoliiton eduskuntaryhmä',
        groupId: 'vas01',
        startDate: new Date('2007-03-21'),
        endDate: null
      }
    ]);
  });

  it('parses current and former member of parliament', () => {
    const XmlDataFi = fs.readFileSync(path.join(__dirname, '../fixtures/Eduskuntaryhmat-nykyinen-ja-entinen.xml'), 'utf-8');
    expect(extractMemberPartyInformation(XmlDataFi)).to.deep.equal([
      {
        groupName: 'Kansallisen kokoomuksen eduskuntaryhmä',
        groupId: 'kok01',
        startDate: new Date('2015-04-22'),
        endDate: new Date('2018-04-19')
      },
      {
        groupName: 'edustaja Harkimo',
        groupId: 'hh01',
        startDate: new Date('2018-04-20'),
        endDate: new Date('2018-04-26')
      },
      {
        groupName: 'Liike Nyt -eduskuntaryhmä',
        groupId: 'liik01',
        startDate: new Date('2018-04-27'),
        endDate: null
      }
    ]);
  });

  it('ignores EntNimi if present', () => {
    const XmlDataFi = fs.readFileSync(path.join(__dirname, '../fixtures/Eduskuntaryhmat-EntNimi.xml'), 'utf-8');
    expect(extractMemberPartyInformation(XmlDataFi)).to.deep.equal([
      {
        groupName: 'Vasemmistoliiton eduskuntaryhmä',
        groupId: 'vas01',
        startDate: new Date('1987-03-21'),
        endDate: new Date('1995-03-23')
      }
    ]);
  });
});
