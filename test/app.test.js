const request = require('supertest');
const { expect } = require('chai');
const server = require('../src/server');
const getDb = require('../src/db');

const app = server();

describe('GET /site-api/edustajat', () => {
  let app, db;
  before(() => {
    db = getDb('testing');
    app = server({ db });
  });
  after(() => db.destroy());

  it('returns query results', () => {
    return request(app)
      .get('/site-api/edustajat?nameQuery=hakka')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(respone.body).to.be.an('array');
        expect(respone.body).to.have.length(1);
        expect(respone.body[0]).to.deep.equal({
          firstName: 'Teuvo',
          lastName: 'Hakkarainen'
        });
      });
  });

  it('requires at least 2 characters in search query', () => {
    return request(app)
      .get('/site-api/edustajat?nameQuery=')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(respone.body).to.be.an('array');
        expect(respone.body).to.have.length(0);
      })
      .then(() =>
        request(app)
          .get('/site-api/edustajat?nameQuery=a')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(respone.body).to.be.an('array');
            expect(respone.body).to.have.length(0);
          })
      )
      .then(() =>
        request(app)
          .get('/site-api/edustajat?nameQuery=ak')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(respone.body).to.be.an('array');
            expect(respone.body).to.have.length(1);
            expect(respone.body[0]).to.deep.equal({
              firstName: 'Teuvo',
              lastName: 'Hakkarainen'
            });
          })
      );
  });

  it('is case insensitive');

  it('supports wildcard');
});
