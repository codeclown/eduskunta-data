const request = require('supertest');
const { expect } = require('chai');
const server = require('../../src/server/server');
const prepareForInsert = require('../../src/server/utils/prepareForInsert');
const getDb = require('../../src/server/db');

const table = require('../../src/server/schema.json').tables.find(table => table.tableName === 'MemberOfParliament');
const record = prepareForInsert(table, {"personId":"102","lastname":" Aaltonen","firstname":"Markus","party":"","minister":"f","XmlData":null,"XmlDataSv":"<redacted>","XmlDataFi":"<redacted>"});

describe('GET /site-api/MemberOfParliament', () => {
  let app, db;
  before(() => {
    db = getDb('testing');
    app = server({ db });
    return db('MemberOfParliament').truncate().then(() =>
      db('MemberOfParliament').insert(record)
    );
  });
  after(() => db.destroy());

  it('returns nothing if nothing matches', () => {
    return request(app)
      .get('/site-api/MemberOfParliament?terms=foobar')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length(0);
      });
  });

  it('queries MemberOfParliament only based on name', () => {
    return request(app)
      .get(`/site-api/MemberOfParliament?terms=${encodeURIComponent(record.id)}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length(0);
      });
  });

  it('returns query results', () => {
    return request(app)
      .get('/site-api/MemberOfParliament?terms=aalto')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length(1);
        expect(response.body[0]).to.deep.equal(record);
      });
  });

  it('returns query terms as header', () => {
    return request(app)
      .get('/site-api/MemberOfParliament?terms=aalto')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.headers['x-terms']).to.equal('aalto');
      });
  });

  it('requires at least 2 characters in search query', () => {
    return request(app)
      .get('/site-api/MemberOfParliament?terms=')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .then(response => {
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length(0);
      })
      .then(() =>
        request(app)
          .get('/site-api/MemberOfParliament?terms=a')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401)
          .then(response => {
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.length(0);
          })
      )
      .then(() =>
        request(app)
          .get('/site-api/MemberOfParliament?terms=aa')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.length(1);
            expect(response.body[0]).to.deep.equal(record);
          })
      );
  });

  it('is case insensitive', () => {
    return request(app)
      .get('/site-api/MemberOfParliament?terms=AALTO')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length(1);
        expect(response.body[0]).to.deep.equal(record);
      });
  });

  it('does not care about extra whitespace', () => {
    return request(app)
      .get(`/site-api/MemberOfParliament?terms=${encodeURIComponent(' rkus  aalto')}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length(1);
        expect(response.body[0]).to.deep.equal(record);
      });
  });
});
