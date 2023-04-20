import { type Input, type FormSchema, parse } from "@conform-to/validitystate"
import { type ActionArgs, json } from "@remix-run/cloudflare";
import { Form, useActionData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { login } from "~/auth.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, {
    schema,
    formatError,
  });

  if (submission.error) {
    return json(submission, { status: 400 })
  }

  return await login(submission.value);
}

const schema = {
    email: {
        type: "email",
        required: true,
        pattern: "[^@]+@[A-Za-z0-9]+.[A-Za-z0-9]+",
    },
    password: {
        type: "password",
        required: true,
    },
} satisfies FormSchema;

function formatError(input: Input) {
  if (input.validity.valueMissing) {
    return "The field is required";
  }

  if (input.validity.typeMismatch || input.validity.patternMismatch) {
    return "The value is invalid";
  }

  return "";
}

export default function LoginForm() {
  const lastSubmission = useActionData<typeof action>();
  const [error, setError] = useState(lastSubmission?.error ?? {});

  useEffect(() => {
    if (lastSubmission) {
      setError(lastSubmission?.error ?? {});
    }
  }, [lastSubmission]);

  return (
    <Form
      method="post"
      onInvalid={(event) => {
        const input = event.target as HTMLInputElement;

        setError((error) => ({
          ...error,
          [input.name]: formatError(input),
        }));

        event.preventDefault();
      }}
      onSubmit={(event) => {
        const form = event.currentTarget;

        // Reset errors
        setError({});

        // Check validity of each field
        if (!form.reportValidity()) {
          // Prevent default form submission
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