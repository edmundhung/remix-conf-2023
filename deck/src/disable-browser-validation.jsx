import { Form } from '@remix-run/react';

export default function SignupForm() {
  return (
    <Form
      method="post"
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
          pattern="(?=.*?[a-z])(?=.*?[A-Z]).*"
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