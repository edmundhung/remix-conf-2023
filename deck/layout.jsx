import React from 'react';

export function Layout({ children }) {
  return (
    <div style={{ padding: '2rem' }}>
      {children}
    </div>
  );
}

export function Example({ src }) {
  const base = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8788'
    : window.location.href;
  const url = new URL(src, base);
  
  return (
    <iframe
      src={url} 
      style={{ height: '100%', width: '100%', border: 'none', backgroundColor: 'rgb(229 231 235)' }}
      title="example"
    />
  );
}

export function Centered({ children }) {
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>{children}</div>
    </div>
  );
}