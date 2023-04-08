import { Form } from '@remix-run/react';
import { useEffect, useState } from 'react';

export default function Example2() {
  const [error, setError] = useState<Record<string, string>>({});

  useEffect(() => {
    setError({
        email: 'Email error',
        password: 'Password error',
    })
  }, []);

  return (
    <Form
      method="post"
    >
      <div>
        <label>Email</label>
        <input
          className={error.email ? 'error' : ''}
          name="email"
          type="email"
          required
          pattern="[^@]+@[A-Za-z0-9]+.[A-Za-z0-9]+"
          autoComplete="off"
        />
        <p>{error.email}</p>
      </div>
      <div>
        <label>Password</label>
        <input
          className={error.password ? 'error' : ''}
          name="password"
          type="password"
          required
        />
        <p>{error.password}</p>
      </div>
      <button>Login</button>
    </Form>
  );
}
