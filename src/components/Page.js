import React from 'react';

const Page = ({ title, content }) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <title>{title && `${title} |`} Eduskunta Data</title>
      <link rel="stylesheet" href="/assets/client.css" />
    </head>
    <body>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </body>
  </html>
);

export default Page;
