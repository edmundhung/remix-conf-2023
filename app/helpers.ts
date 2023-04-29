import { redirect } from "@remix-run/cloudflare";

export function notifySubmission(event: Event): void {
  event.preventDefault();
  alert('submitted');
}

export function defaultAction({ request }: { request: Request }): Response {
  return redirect(request.url);
}