import React from 'react';
import Footer from './Footer';

const Page = ({ title, content, includeFooter, lastDataUpdate }) => (
  <html className="h-100">
    <head>
      <meta charSet='utf-8' />
      <title>{title && `${title} |`} Eduskunta Data</title>
      <link rel="stylesheet" href="/assets/client.css" />
    </head>
    <body className="d-flex flex-column h-100">
      <div className="flex-shrink-0" dangerouslySetInnerHTML={{ __html: content }} />
      {includeFooter && <Footer lastDataUpdate={lastDataUpdate} />}
    </body>
  </html>
);

export default Page;
