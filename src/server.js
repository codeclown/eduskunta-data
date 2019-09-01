const express = require('express');

const { tables } = require('./schema.json');

const server = ({ db }) => {
  const app = express();

  app.get('/site-api/:tableName', (req, res, next) => {
    const { tableName } = req.params;
    const table = tables.find(table => table.tableName === tableName);
    if (!table) {
      return res.status(404).json({});
    }
    return db(tableName).limit(10).then(rows => {
      res.json(rows);
    })
  });

  return app;
};

module.exports = server;
