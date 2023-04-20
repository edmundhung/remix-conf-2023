import { Form } from '@remix-run/react';
import { useState } from 'react';

export default function LoginForm() {
  const [error, setError] = useState<Record<string, string>>({});

  return (
    <Form
      method="post"
      onInvalid={(event) => {
        const input = event.target as HTMLInputElement;

        // Update message based on the input name
        setError((error) => ({
          ...error,
          [input.name]: input.validationMessage,
        }));

        // Prevent default error bubble
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