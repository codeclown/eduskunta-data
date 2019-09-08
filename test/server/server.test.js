const request = require('supertest');
const { expect } = require('chai');
const server = require('../../src/server/server');
const getDb = require('../../src/server/db');

describe('server', () => {
  let app, db;
  before(() => {
    db = getDb('testing');
    app = server({ db });
  });
  after(() => db.destroy());

  describe('GET /', () => {
    it('redirects to /haku');
  });

  describe('GET /haku', () => {
    it('renders', () => {
      return request(app)
        .get('/haku')
        .expect('Content-Type', /html/)
        .expect(200);
    });
  });
});
