const request = require('supertest');
const { expect } = require('chai');
const prepareForInsert = require('../../src/utils/prepareForInsert');

describe('prepareForInsert', () => {
  it('adds primary key as integer column', () => {
    const table = {
      primaryKey: 'personId',
      columns: [/* irrelevant */]
    };
    const row = {"personId":"102","lastname":" Aaltonen","firstname":"Markus","party":"","minister":"f","XmlData":null,"XmlDataSv":"<redacted>","XmlDataFi":"<redacted>"};
    const prepared = prepareForInsert(table, row);
    expect(prepared.personId_Integer).to.equal(102);
  });

  it('adds datetime columns for date columns');
});
