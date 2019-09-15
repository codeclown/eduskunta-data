import express from 'express';
import 'express-async-errors';
import fs from 'fs';
import path from 'path';
import React from 'react';
import * as ReactDOM from 'react-dom/server';
import ErrorPage from '../components/ErrorPage';
import Page from '../components/Page';
import PersonPage from '../components/PersonPage';
import PersonVotesPage from '../components/PersonVotesPage';
import SearchPage from '../components/SearchPage';
import searchFromDb from './utils/searchFromDb';

const server = ({ db }) => {
  const app = express();

  app.use('/assets', express.static(`${__dirname}/../../dist`));

  app.get('/', (req, res) => res.redirect('/haku'));

  app.use((req, res, next) => {
    return db('lastDataUpdate').first().then(({ lastDataUpdate }) => {
      res.locals.lastDataUpdate = lastDataUpdate;
      next();
    })
  });

  app.get('/haku', async (req, res) => {
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

  app.get('/edustaja/:personId', async (req, res) => {
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

  app.get('/edustaja/:personId/aanestykset', async (req, res) => {
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

  app.get('/edustaja/:personId/portrait.jpg', (req, res) => {
    const personId = parseInt(req.params.personId);
    const filePath = path.join(__dirname, '../../data', `${personId}.jpg`);
    const defaultImage = path.join(__dirname, '../client/default-portrait.png');
    fs.stat(filePath, err => {
      if (err) {
        return res.sendFile(defaultImage);
      }
      res.sendFile(filePath);
    });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    try {
      const html = ReactDOM.renderToString(
        <ErrorPage error={err} />
      );
      const page = ReactDOM.renderToStaticMarkup(
        <Page
          title="Tapahtui odottamaton virhe"
          content={html}
        />
      );
      res.status(500).set('content-type', 'text/html').send(`<!DOCTYPE html>${page}`);
    } catch (exception) {
      res.status(500).send('Tapahtui odottamaton virhe');
    }
  });

  return app;
};

module.exports = server;
