import classNames from 'classnames';
import React from 'react';
import range from 'lodash.range';
import Header from './Header';
import PersonInfo from './PersonInfo';

const SearchPage = ({ terms, results, searchType, pageNumber, totalPages, perPage }) => {
  const searchUrl = updated => {
    const params = Object.assign({
      terms,
      searchType,
      pageNumber
    }, updated);
    const query = Object.keys(params).reduce((pairs, key) => pairs.concat([`${key}=${encodeURIComponent(params[key])}`]), []).join('&');
    return `/haku?${query}`;
  };

  return (
    <div>
      <Header terms={terms} />
      <div className="container py-4">
        <p>Tulokset haulle &quot;{terms}&quot;</p>
        <hr className="my-4" />
        <div className="row">
          <div className="col-md-3">
            <button type="button" className={classNames('btn', searchType === 'MemberOfParliament' ? 'btn-dark' : 'btn-light')}>
              Kansanedustajat <span className="badge badge-light ml-1">{results.MemberOfParliament.length}</span>
              <span className="sr-only">tulosta</span>
            </button>
          </div>
          <div className="col-md-9">
            {results[searchType].length ? (
              <div>
                {results[searchType].slice((pageNumber - 1) * perPage, pageNumber * perPage).map(person => (
                  <div key={person.personId} className="my-3">
                    <PersonInfo
                      personId={person.personId}
                      firstName={person.firstname}
                      lastName={person.lastname}
                      parliamentGroupId={person.lastParliamentGroupId}
                      parliamentGroupName={person.lastParliamentGroupName}
                      parliamentGroupEndDate={person.lastParliamentEndDate}
                    />
                  </div>
                ))}
                <nav aria-label="Lisää sivuja">
                  <ul className="pagination justify-content-center">
                    <li className={classNames('page-item', pageNumber === 1 && 'disabled')}>
                      <a className="page-link" href={searchUrl({ pageNumber: pageNumber - 1 })} aria-disabled={pageNumber === 1}>
                        Edellinen sivu
                      </a>
                    </li>
                    {range(1, totalPages + 1).map(page => (
                      <li key={page} className={classNames('page-item', pageNumber === page && 'active')}>
                        <a className="page-link" href={searchUrl({ pageNumber: page })} aria-current={pageNumber === page}>
                          {page}
                        </a>
                      </li>
                    ))}
                    <li className={classNames('page-item', pageNumber === totalPages && 'disabled')}>
                      <a className="page-link" href={searchUrl({ pageNumber: pageNumber + 1 })} aria-disabled={pageNumber === totalPages}>
                        Seuraava sivu
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            ) : (
              <div className="alert alert-secondary" role="alert">
                {terms === '' ? 'Lisää hakuehtoja etsiäksesi kansanedustajia.' : 'Hakuehdoilla ei löytynyt kansanedustajia.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
