import { Form } from '@remix-run/react';

export default function SignupForm() {
  return (
    <Form
      method="post"
      onSubmit={event => {
        event.preventDefault();
        alert('Submitted');
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
