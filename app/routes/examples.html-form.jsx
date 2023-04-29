import { Form } from '@remix-run/react';
import { notifySubmission, defaultAction } from '~/helpers';

export const action = defaultAction;

export default function SignupForm() {
  return (
    <Form
      method="post"
      onSubmit={event => {
        notifySubmission(event);
      }}
    >
      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
        />
      </div>
      <button>Signup</button>
    </Form>
  );
}
