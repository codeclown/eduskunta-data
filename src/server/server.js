const express = require('express');
import fs from 'fs';
import path from 'path';
import React from 'react';
import * as ReactDOM from 'react-dom/server';
import Page from '../components/Page';
import PersonPage from '../components/PersonPage';
import PersonVotesPage from '../components/PersonVotesPage';
import SearchPage from '../components/SearchPage';
import searchFromDb from './utils/searchFromDb';

const { tables } = require('./schema.json');

const server = ({ db }) => {
  const app = express();

  app.use('/assets', express.static(`${__dirname}/../../dist`));

  app.get('/', (req, res, next) => res.redirect('/haku'));

  app.use((req, res, next) => {
    return db('lastDataUpdate').first().then(({ lastDataUpdate }) => {
      res.locals.lastDataUpdate = lastDataUpdate;
      next();
    })
  });

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
    const page = ReactDOM.renderToStaticMarkup(
      <Page
        title={terms !== '' ? `Tulokset haulle "${terms}"` : 'Haku'}
        content={html}
        includeFooter={true}
        lastDataUpdate={res.locals.lastDataUpdate}
      />
    );
    res.set('content-type', 'text/html').send(`<!DOCTYPE html>${page}`);
  });

  app.get('/edustaja/:personId', async (req, res, next) => {
    const personId = parseInt(req.params.personId);
    const person = await db('MemberOfParliament').where({ personId }).first();
    const groupMemberships = await db('parliamentGroupMemberships')
      .where('personId', personId)
      .orderBy('parliamentGroupMemberships.startDate', 'desc')
      .join('parliamentGroups', 'parliamentGroups.groupId', '=', 'parliamentGroupMemberships.groupId');
    const recentVotes = await db('SaliDBAanestysEdustaja')
      .where('SaliDBAanestysEdustaja.EdustajaHenkiloNumero', personId)
      .where('SaliDBAanestysKieli.Kieli', 'fi')
      .join('SaliDBAanestys', 'SaliDBAanestys.AanestysId', '=', 'SaliDBAanestysEdustaja.AanestysId')
      .join('SaliDBAanestys__DateTime__IstuntoPvm', 'SaliDBAanestys.AanestysId', '=', 'SaliDBAanestys__DateTime__IstuntoPvm.AanestysId')
      .join('SaliDBAanestysKieli', 'SaliDBAanestys.KieliId', '=', 'SaliDBAanestysKieli.KieliId')
      .select('SaliDBAanestys.AanestysId', 'SaliDBAanestys.KohtaOtsikko', 'SaliDBAanestysEdustaja.EdustajaAanestys', 'SaliDBAanestys__DateTime__IstuntoPvm.IstuntoPvm')
      .limit(5)
      .orderBy('SaliDBAanestys__DateTime__IstuntoPvm.IstuntoPvm', 'desc');
    const html = ReactDOM.renderToString(
      <PersonPage person={person} groupMemberships={groupMemberships} recentVotes={recentVotes} />
    );
    const page = ReactDOM.renderToStaticMarkup(
      <Page
        title={`${person.firstname} ${person.lastname}`}
        content={html}
        includeFooter={true}
        lastDataUpdate={res.locals.lastDataUpdate}
      />
    );
    res.set('content-type', 'text/html').send(`<!DOCTYPE html>${page}`);
  });

  app.get('/edustaja/:personId/aanestykset', async (req, res, next) => {
    const personId = parseInt(req.params.personId);
    const person = await db('MemberOfParliament').where({ personId }).first();
    const votes = await db('SaliDBAanestysEdustaja')
      .where('SaliDBAanestysEdustaja.EdustajaHenkiloNumero', personId)
      .where('SaliDBAanestysKieli.Kieli', 'fi')
      .join('SaliDBAanestys', 'SaliDBAanestys.AanestysId', '=', 'SaliDBAanestysEdustaja.AanestysId')
      .join('SaliDBAanestys__DateTime__IstuntoPvm', 'SaliDBAanestys.AanestysId', '=', 'SaliDBAanestys__DateTime__IstuntoPvm.AanestysId')
      .join('SaliDBAanestysKieli', 'SaliDBAanestys.KieliId', '=', 'SaliDBAanestysKieli.KieliId')
      .select('SaliDBAanestys.AanestysId', 'SaliDBAanestys.KohtaOtsikko', 'SaliDBAanestysEdustaja.EdustajaAanestys', 'SaliDBAanestys__DateTime__IstuntoPvm.IstuntoPvm')
      .orderBy('SaliDBAanestys__DateTime__IstuntoPvm.IstuntoPvm', 'desc');
    const html = ReactDOM.renderToString(
      <PersonVotesPage person={person} votes={votes} />
    );
    const page = ReactDOM.renderToStaticMarkup(
      <Page
        title={`${person.firstname} ${person.lastname}`}
        content={html}
        includeFooter={true}
        lastDataUpdate={res.locals.lastDataUpdate}
      />
    );
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
