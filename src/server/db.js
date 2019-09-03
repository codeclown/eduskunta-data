const knex = require('knex');
const config = require('./knexfile');

const getDb = env => {
  return knex(config[env || 'development']);
};

module.exports = getDb;
