import { Form } from '@remix-run/react';
import { useState } from 'react';

function formatError({ input, formData }) {
  switch (input.name) {
    case 'email':
      if (input.validity.valueMissing) {
        return 'Email is required';
      } else if (input.validity.typeMismatch) {
        return 'Email is invalid';
      }
      break;
    case 'password':
      if (input.validity.valueMissing) {
        return 'Password is required';
      } else if (input.validity.tooShort) {
        return 'Password must be at least 8 characters';
      } else if (input.validity.patternMismatch) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      break;
    case 'confirmPassword':
      if (input.validity.valueMissing) {
        return 'Confirm password is required';
      } else if (input.value !== formData.get('password')) {
        return 'Passwords do not match';
      }
      break;
  }

  return '';
}

export default function SignupForm() {
  const [error, setError] = useState({});

  return (
    <Form
      method="post"
      onInvalid={event => {
        const input = event.target;

        setError((error) => ({
          ...error,
          [input.name]: input.validationMessage,
        }));

        event.preventDefault();
      }}
      onSubmit={event => {
        const form = event.currentTarget;
        const formData = new FormData(form);

        for (const input of form.elements) {
          if (input instanceof HTMLInputElement) {
            input.setCustomValidity(formatError({ input, formData }));
          }
        }

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
          minLength={8}
          pattern="(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[1-9]).*"
        />
        <p>{error.password}</p>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          className={error.confirmPassword ? 'error' : ''}
          name="confirmPassword"
          type="password"
          required
        />
        <p>{error.confirmPassword}</p>
      </div>
      <button>Signup</button>
    </Form>
  );
}