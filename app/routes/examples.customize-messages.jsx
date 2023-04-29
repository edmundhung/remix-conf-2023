import { Form } from '@remix-run/react';
import { notifySubmission, defaultAction } from '~/helpers';

function formatError({ input }) {
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