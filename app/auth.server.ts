import { redirect } from "@remix-run/cloudflare";

export async function login(value: Record<string, any>) {
    const searchParams = new URLSearchParams(value);

    return redirect(`/examples/result?${searchParams}`);
}