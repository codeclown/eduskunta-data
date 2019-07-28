module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: 'foo',
      password: 'secret',
      database: 'foo'
    }
  },
  testing: {
    client: 'pg',
    connection: {
      user: 'foo2',
      password: 'secret',
      database: 'foo2'
    }
  },
  migrations: {
    directory: `${__dirname}/migrations`
  }
};
