import { type ActionArgs } from '@remix-run/cloudflare';
import { Form } from '@remix-run/react';
import { useState } from 'react';
import { login } from '~/auth.server';

const schema = {
    email: {
        type: 'email',
        required: true,
        pattern: '[^@]+@[A-Za-z0-9]+.[A-Za-z0-9]+',
    },
    password: {
        type: 'password',
        required: true,
    },
};

function formatValidity({ validity }: { validity: ValidityState }) {
  if (validity.valueMissing) {
    return 'The field is required';
  }

  if (validity.typeMismatch || validity.patternMismatch) {
    return 'The value is invalid';
  }

  return '';
}

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const value = Object.fromEntries(formData);

    return await login(value);
} 

export default function Example4() {
  const [error, setError] = useState<Record<string, string>>({});

  return (
    <Form
      method="post"
      onInvalidCapture={event => {
        const input = event.target as HTMLInputElement;

        setError(error => ({
          ...error,
          [input.name]: formatValidity(input),
        }));

        event.preventDefault();
      }}
      onSubmit={event => {
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
          {...schema.email}
          autoComplete="off"
        />
        <p>{error.email}</p>
      </div>
      <div>
        <label>Password</label>
        <input
          className={error.password ? 'error' : ''}
          name="password"
          {...schema.password}
        />
        <p>{error.password}</p>
      </div>
      <button>Login</button>
    </Form>
  );
}