import { parse } from "@conform-to/validitystate"
import { json } from "@remix-run/node";
import { Form } from '@remix-run/react';
import { useState } from 'react';
import { login } from "~/auth.server";

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
};

function formatError(input) {
  if (input.validity.valueMissing) {
    return "The field is required";
  }

  if (input.validity.typeMismatch || input.validity.patternMismatch) {
    return "The value is invalid";
  }

  return "";
}

export async function action({ request }) {
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

export default function LoginForm() {
  const lastSubmission = useActionData();
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
        const input = event.target;

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
        <div>{error.email}</div>
      </div>
      <div>
        <label>Password</label>
        <input
          className={error.password ? 'error' : ''}
          name="password"
          {...schema.password}
        />
        <div>{error.password}</div>
      </div>
      <button>Login</button>
    </Form>
  );
}