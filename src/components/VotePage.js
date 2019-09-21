import classNames from 'classnames';
import React from 'react';
import Header from './Header';
import PersonInfo from './PersonInfo';
import { formatDate } from '../server/utils/dateFormatting';

const VotePage = ({ vote, groupedVotes }) => {
  return (
    <div>
      <Header />
      <div className="container py-4">
        <h5>{vote.KohtaOtsikko}</h5>
        <p className="my-3">
          <a className="mr-3" target="_blank" rel="noopener noreferrer" href={`https://www.eduskunta.fi${vote.Url}`}>eduskunta.fi</a>
          <a className="mr-3" target="_blank" rel="noopener noreferrer" href={`https://www.eduskunta.fi${vote.AanestysPoytakirjaUrl}`}>pöytäkirja</a>
          <a className="mr-3" target="_blank" rel="noopener noreferrer" href={`https://www.eduskunta.fi${vote.AanestysValtiopaivaasiaUrl}`}>valtiopäiväasia</a>
        </p>
        <div className="row">
          {['Jaa', 'Ei', 'Tyhjää', 'Poissa'].map((answer, index) => (
            <div className="col-md-3" key={index}>
              <h6>{answer} ({vote[`AanestysTulos${answer === 'Tyhjää' ? 'Tyhjia' : answer}`].trim()})</h6>
              {(groupedVotes[answer] || []).map(personVote => (
                <div key={personVote.EdustajaHenkiloNumero} className="my-1">
                  <PersonInfo
                    small
                    personId={personVote.EdustajaHenkiloNumero}
                    firstName={personVote.EdustajaEtunimi}
                    lastName={personVote.EdustajaSukunimi}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VotePage;
