module.exports = {
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
  development: {
    client: 'pg',
    connection: {
      user: 'foo',
      password: 'secret',
      database: 'foo',
      port: 5432
    }
  },
  testing: {
    client: 'pg',
    connection: {
      user: 'foo2',
      password: 'secret',
      database: 'foo2',
      port: 5433
    }
  },
  migrations: {
    directory: `${__dirname}/migrations`
  }
};
