import { type LoaderArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
    const url = new URL(request.url);

    return {
        email: url.searchParams.get("email"),
        password: url.searchParams.get("password"),
    };
}

export default function Result() {
    const { email, password } = useLoaderData<typeof loader>();

    return (
        <div>
            <p>Email: {email || '(empty)'}</p>
            <p>Password: {password || '(empty)'}</p>
            <div className="mt-8">
                <Link to="../nojs" reloadDocument>Back</Link>
            </div>
        </div>
    );
}