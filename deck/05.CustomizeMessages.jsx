import { Form } from '@remix-run/react';
import { useState } from 'react';

function formatError(input) {
  if (input.validity.valueMissing) {
    return "The field is required";
  }

  if (input.validity.typeMismatch || input.validity.patternMismatch) {
    return "The value is invalid";
  }

  return "";
}

export default function LoginForm() {
  const [error, setError] = useState({});

  return (
    <Form
      method="post"
      onInvalidCapture={(event) => {
        const input = event.target;
  
        setError((error) => ({
          ...error,
          [input.name]: formatError(input),
        }));

        event.preventDefault();
      }}
      onSubmit={(event) => {
        const form = event.currentTarget;

        setError({});

        if (!form.reportValidity()) {
          event.preventDefault();
        }
      }}
      noValidate
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
        <div>{error.email}</div>
      </div>
      <div>
        <label>Password</label>
        <input
          className={error.password ? 'error' : ''}
          name="password"
          type="password"
          required
        />
        <div>{error.password}</div>
      </div>
      <button>Login</button>
    </Form>
  );
}
