import React from 'react';

const ErrorPage = ({ error }) => {
  return (
    <div>
      <div className="container py-5">
        <h1 className="mb-4">Tapahtui odottamaton virhe</h1>
        <p>Jotain meni vikaan eikä sivua voitu näyttää.</p>
        <p><a href="/">Palaa takaisin etusivulle</a></p>
        <hr className="my-5" />
        <p className="font-weight-bolder">Tekninen kuvaus:</p>
        <pre><code>{error.stack}</code></pre>
      </div>
    </div>
  );
}

export default ErrorPage;
