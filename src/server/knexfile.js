module.exports = {
  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'eduskunta-data-production',
      password: 'secret',
      database: 'eduskunta-data-production',
      port: 5432
    }
  },
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'eduskunta-data-development',
      password: 'secret',
      database: 'eduskunta-data-development',
      port: 5432
    }
  },
  testing: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'eduskunta-data-testing',
      password: 'secret',
      database: 'eduskunta-data-testing',
      port: 5432
    }
  },
  migrations: {
    directory: `${__dirname}/migrations`
  }
};
