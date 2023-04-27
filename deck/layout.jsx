import React from 'react';

function getUrl(src) {
  const base = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8788'
    : 'https://remix-conf-2023.edmund.dev';

  return new URL(src, base);
}

export function Example({ src, style }) {
  const url = getUrl(src);
  
  return (
    <iframe
      src={url} 
      style={{ height: '100%', width: '100%', border: 'none', backgroundColor: 'rgb(229 231 235)', ...style }}
      title="example"
    />
  );
}

export function Picture({ src, style }) {
  const url = getUrl(src);

  return (
    <img src={url} style={{ maxWidth: '85vw', ...style }} />
  );
}

export function Layout({ children }) {
  return (
    <div style={{ height: '100vh', width:'100vw' }}>
      <div style={{ height: '100%', width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>{children}</div>
      </div>
      Remix Conf 2023
    </div>
  );
}