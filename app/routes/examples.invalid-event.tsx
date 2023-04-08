import { Form } from '@remix-run/react';
import { useState } from 'react';

export default function Example2() {
  const [error, setError] = useState<Record<string, string>>({});

  return (
    <Form
      method="post"
      onInvalidCapture={event => {
        const input = event.target as HTMLInputElement;

        setError(error => ({
          ...error,
          [input.name]: input.validationMessage,
        }));

        event.preventDefault();
      }}
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
