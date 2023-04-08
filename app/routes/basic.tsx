import { Form } from '@remix-run/react';

export default function Basic() {
    return (
      <Form method="post">
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            required
            pattern="[^@]+@[A-Za-z0-9]+.[A-Za-z0-9]+"
            autoComplete="off"
          />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" required />
        </div>
        <button>Login</button>
      </Form>
    );
  }
  