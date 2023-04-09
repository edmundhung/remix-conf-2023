import React from 'react';

export function Example({ src }) {
  const base = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8788'
    : 'https://remix-conf-2023.edmund.dev';
  const url = new URL(src, base);
  
  return (
    <iframe
      src={url} 
      style={{ height: '100%', width: '100%', border: 'none', backgroundColor: 'rgb(229 231 235)' }}
      title="example"
    />
  );
}

export function Layout({ children }) {
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>{children}</div>
    </div>
  );
}