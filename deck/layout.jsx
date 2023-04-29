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
      style={{ height: '100%', width: '100%', border: 'none', backgroundColor: 'rgb(243 244 246)', ...style }}
      title="example"
    />
  );
}

export function Picture({ src, style }) {
  const url = getUrl(src);

  return (
    <img src={url} style={{ maxWidth: '90vw', maxHeight: '80vh', ...style }} />
  );
}

export function Layout({ title, children }) {
  return (
    <div style={{ padding: '0.5em', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'100vw' }}>
      <div style={{ paddingTop: '0.5em', fontSize: '3rem', fontWeight: 700, lineHeight: 1.125 }}>{title}</div>
      <div style={{ height: '100%', width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>{children}</div>
      </div>
      <div style={{ fontSize: '1rem' }}>Edmund Hung @ Remix Conf 2023</div>
    </div>
  );
}