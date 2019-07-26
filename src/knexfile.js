module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    user: 'foo',
    password: 'secret',
    database: 'foo'
  },
  migrations: {
    directory: `${__dirname}/migrations`
  }
};
