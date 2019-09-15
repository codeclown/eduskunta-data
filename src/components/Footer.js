import React from 'react';
import { formatDate, formatTime } from '../server/utils/dateFormatting';

const Footer = ({ lastDataUpdate }) => {
  return (
    <div className="mt-auto">
      {lastDataUpdate && (
        <div className="pb-3 pt-5 text-muted">
          <div className="container">
            Informaatio päivitetty viimeksi {formatDate(lastDataUpdate)} noin klo {formatTime(lastDataUpdate)}
          </div>
        </div>
      )}
      <div className="py-3 text-muted bg-light">
        <div className="container">
          <p className="my-2">
            Lähteet: <a href="https://avoindata.eduskunta.fi" className="text-muted footer-link" target="_blank" rel="noopener noreferrer">avoindata.eduskunta.fi</a>
          </p>
          <p className="my-2">
            Tietojen oikeellisuutta ei taata. Palvelu on <a href="https://github.com/codeclown/eduskunta-data" className="text-muted footer-link" target="_blank" rel="noopener noreferrer">avointa lähdekoodia</a> ja sitä ylläpitää yksityishenkilö.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
