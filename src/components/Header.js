import React from 'react';

const Header = ({ terms }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">Eduskunta Data</a>
        <form className="my-2 my-lg-0 ml-auto" style={{ width: 320 }} method="GET" action="/haku">
          <input
            className="form-control"
            type="search"
            name="terms"
            defaultValue={terms || ''}
            placeholder="Hae henkilöä, äänestystä, lakialoitetta…"
            aria-label="Hae henkilöä, äänestystä, lakialoitetta…"
          />
        </form>
      </div>
    </nav>
  );
}

export default Header;
