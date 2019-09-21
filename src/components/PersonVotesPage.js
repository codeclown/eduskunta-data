import classNames from 'classnames';
import React from 'react';
import Header from './Header';
import PersonInfo from './PersonInfo';
import { formatDate } from '../server/utils/dateFormatting';

const PersonVotesPage = ({ person, votes }) => {
  return (
    <div>
      <Header />
      <div className="container py-4">
        <div className="mb-4" style={{ display: 'flex', alignItems: 'center' }}>
          <PersonInfo
            small
            personId={person.personId}
            firstName={person.firstname}
            lastName={person.lastname}
          />
          <span className="mx-3 text-black-50">/</span>
          Äänestykset
        </div>
        <h5>Edustajan {person.firstname} {person.lastname} äänestykset ({votes.length})</h5>
        {votes.length ? (
          <div className="my-3">
            {votes.map(vote => (
              <div key={vote.AanestysId} className="row my-1">
                <div className="col-md-2">
                  {formatDate(vote.IstuntoPvm)}
                </div>
                <div className="col-md-8">
                  <a href={`/aanestys/${vote.AanestysId}`}>
                    {vote.KohtaOtsikko.length > 100 ? `${vote.KohtaOtsikko.slice(0, 100)}…` : vote.KohtaOtsikko}
                  </a>
                </div>
                <div className="col-md-2">
                  <span className={classNames(
                    ['Jaa', 'Ja'].includes(vote.EdustajaAanestys.trim()) && 'text-success',
                    ['Ei', 'Nej'].includes(vote.EdustajaAanestys.trim()) && 'text-danger',
                    ['Poissa', 'Frånvarande'].includes(vote.EdustajaAanestys.trim()) && 'text-muted'
                  )}>
                    {vote.EdustajaAanestys}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted my-1">
            Ei äänestyksiä.
          </p>
        )}
      </div>
    </div>
  );
}

export default PersonVotesPage;
