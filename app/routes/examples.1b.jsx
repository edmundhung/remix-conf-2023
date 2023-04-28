import { Form } from '@remix-run/react';

export default function SignupForm() {
  return (
    <Form method="post">
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
