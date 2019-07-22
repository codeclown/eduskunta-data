const knex = require('knex');

module.exports = {
  documentsToDownload: () => {
    const db = knex({
      client: 'sqlite3',
      connection: {
        filename: `${__dirname}/../data/documentsToDownload.sqlite`
      },
      useNullAsDefault: true
    });
    return db.schema.hasTable('documentsToDownload')
      .then(exists => {
        if (!exists) {
          console.log('Creating table documentsToDownload');
          return db.schema.createTable('documentsToDownload', table => {
            table.increments('id').unsigned();
            table.string('eduskuntaId').unique();
            table.string('dataUrl');
            table.enu('status', ['unprocessed', 'processing', 'errored']);
          });
        }
      })
      .then(() => db);
  }
};
