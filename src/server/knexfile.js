module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'ekdb-dev',
      password: 'secret',
      database: 'ekdb-dev',
      port: 5400
    }
  },
  testing: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'ekdb-tests',
      password: 'secret',
      database: 'ekdb-tests',
      port: 5401
    }
  },
  migrations: {
    directory: `${__dirname}/migrations`
  }
};
