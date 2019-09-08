import classNames from 'classnames';
import React from 'react';
import Header from './Header';

const PersonPage = ({ person, recentVotes }) => {
  return (
    <div>
      <Header />
      <div className="container py-4">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <img
                src={`/edustaja/${person.personId}/portrait.jpg`}
                alt={`${person.firstname} ${person.lastname}`}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{person.firstname} {person.lastname}</h5>
                <p className="card-text">{person.party || <span className="text-muted">Ei puoluetietoa</span>}</p>
                <a target="_blank" href={`https://www.eduskunta.fi/FI/kansanedustajat/Sivut/${person.personId}.aspx`} className="card-link">eduskunta.fi</a>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <h5>Viimeisimmät äänestykset</h5>
            {recentVotes.length ? (
              <div className="my-3">
                {recentVotes.map(vote => (
                  <div key={vote.AanestysId} className="row my-1">
                    <div className="col-md-2 text-right">
                      {vote.IstuntoPvm.toLocaleDateString('fi-FI', { dateStyle: 'long' })}
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
            <div className="mt-2">
              <a href={`/edustaja/${person.personId}/aanestykset`} className="btn btn-light btn-sm">Hae kaikki äänestykset &raquo;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonPage;
