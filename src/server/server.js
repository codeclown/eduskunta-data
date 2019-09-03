const express = require('express');

const { tables } = require('./schema.json');

const server = ({ db }) => {
  const app = express();

  app.use('/assets', express.static(`${__dirname}/../../dist`));

  app.get('/', (req, res, next) => {
    res.set('content-type', 'text/html').send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title></title>
          <link rel="stylesheet" href="/assets/client.css" />
        </head>
        <body>
          <script src="/assets/client.js"></script>
        </body>
      </html>
    `);
  });

  app.get('/site-api/:tableName', (req, res, next) => {
    const queryableColumns = {
      MemberOfParliament: ['firstname', 'lastname']
    };
    const { tableName } = req.params;
    const table = tables.find(table => table.tableName === tableName);
    if (!table) {
      return res.status(404).json([]);
    }
    const { terms } = req.query;
    if (typeof terms === 'undefined' || terms.length < 2) {
      return res.status(401).json([]);
    }
    const query = db(tableName);
    const columnsToQuery = queryableColumns[tableName] || [];
    terms.trim().split(/\s+/g).forEach(term => {
      columnsToQuery.forEach(column => {
        query.orWhere(column, 'ilike', `%${term}%`);
      });
    });
    return query.then(rows => {
      res.set('x-terms', terms).json(rows);
    })
  });

  return app;
};

module.exports = server;
