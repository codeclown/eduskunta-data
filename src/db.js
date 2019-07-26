const knex = require('knex');
const config = require('./knexfile');

const getDb = () => {
  return knex(config);
};

module.exports = getDb;
