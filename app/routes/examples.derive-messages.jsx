import { Form } from '@remix-run/react';
import { notifySubmission, defaultAction } from '~/helpers';

function formatError({ input }) {
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
      }
      break;
  }

  return '';
}

export const action = defaultAction;

export default function SignupForm() {
  return (
    <Form
      method="post"
      onSubmit={event => {
        const form = event.currentTarget;

        for (const input of form.elements) {
          if (input instanceof HTMLInputElement) {
            input.setCustomValidity(formatError({ input }));
          }
        }

        if (!form.reportValidity()) {
          event.preventDefault();
          return;
        }
        
        notifySubmission(event);
      }}
      noValidate
    >
      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          autoComplete="off"
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          pattern="(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[1-9]).*"
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          required
        />
      </div>
      <button>Signup</button>
    </Form>
  );
}