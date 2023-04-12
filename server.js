import { createRequestHandler } from "@remix-run/cloudflare";
import * as build from "@remix-run/dev/server-build";

let handleRequest;

export function onRequest(context) {
  if (!handleRequest) {
		handleRequest = createRequestHandler(
			build,
			context.env.ENVIRONMENT,
		);
	}

	// This is where you can pass a custom load context to your app
	return handleRequest(context.request);
}
