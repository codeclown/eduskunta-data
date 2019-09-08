const knex = require('knex');
const config = require('./knexfile');

const getDb = env => {
  return knex(config[env || process.env.NODE_ENV || 'development']);
};

module.exports = getDb;
