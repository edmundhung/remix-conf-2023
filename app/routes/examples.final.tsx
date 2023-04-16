import { type FormSchema, type Input, parse } from '@conform-to/validitystate';
import { json, type ActionArgs } from '@remix-run/cloudflare';
import { Form, useActionData } from '@remix-run/react';
import { useEffect, useState } from 'react';
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
} satisfies FormSchema;

function formatError({ validity }: Input) {
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
    const submission = parse(formData, {
        schema,
        formatError,
    });

    if (submission.error) {
        return json(submission, { status: 400 });
    }

    return await login(submission.value);
} 

export default function Example4() {
  const lastSubmission = useActionData<typeof action>();
  const [error, setError] = useState(lastSubmission?.error ?? {});

  useEffect(() => {
    if (!lastSubmission) {
        return;
    }

    setError(lastSubmission.error);
  }, [lastSubmission]);

  return (
    <Form
      method="post"
      onInvalidCapture={event => {
        const input = event.target as HTMLInputElement;

        setError(error => ({
          ...error,
          [input.name]: formatError(input),
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