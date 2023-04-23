import { Form } from '@remix-run/react';

export default function Basic() {
    return (
      <Form method="post">
        <div>
          <label>Message*</label>
          <input
            name="message"
            type="text"
            required
            autoComplete="off"
          />
        </div>
        <button>Send</button>
      </Form>
    );
  }
  