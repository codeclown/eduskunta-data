const express = require('express');
import fs from 'fs';
import path from 'path';
import React from 'react';
import * as ReactDOM from 'react-dom/server';
import Page from '../components/Page';
import SearchPage from '../components/SearchPage';
import searchFromDb from './utils/searchFromDb';

const { tables } = require('./schema.json');

const server = ({ db }) => {
  const app = express();

  app.use('/assets', express.static(`${__dirname}/../../dist`));

  app.get('/', (req, res, next) => res.redirect('/haku'));

  app.get('/haku', async (req, res, next) => {
    let { terms, searchType, pageNumber } = req.query;
    terms = terms || '';
    searchType = ['MemberOfParliament'].includes(searchType) ? searchType : 'MemberOfParliament';
    pageNumber = parseInt(pageNumber);
    const perPage = 20;
    const results = await searchFromDb(db, terms);
    const html = ReactDOM.renderToString(
      <SearchPage
       terms={terms}
       results={results}
       searchType={searchType}
       pageNumber={pageNumber || 1}
       totalPages={Math.max(1, Math.floor(results[searchType].length / perPage))}
       perPage={perPage}
      />
    );
    const page = ReactDOM.renderToStaticMarkup(<Page title="Haku" content={html} />);
    res.set('content-type', 'text/html').send(`<!DOCTYPE html>${page}`);
  });

  app.get('/edustaja/:personId/portrait.jpg', (req, res, next) => {
    const personId = parseInt(req.params.personId);
    const filePath = path.join(__dirname, '../../data', `${personId}.jpg`);
    const defaultImage = path.join(__dirname, '../client/default-portrait.png');
    fs.stat(filePath, (err, file) => {
      if (err) {
        return res.sendFile(defaultImage);
      }
      res.sendFile(filePath);
    });
  });

  return app;
};

module.exports = server;
