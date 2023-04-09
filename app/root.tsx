import { type LinksFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useSearchParams,
} from "@remix-run/react";
import styles from "~/styles.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export function useShouldHydrate() {
  const [searchParams] = useSearchParams();
  const shouldHydrate = searchParams.has('hydrate') ? searchParams.get("hydrate") === 'yes' : true;

  return shouldHydrate;
}

export default function App() {
  const shouldHydrate = useShouldHydrate();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-screen bg-gray-200">
        <Outlet />
        <ScrollRestoration />
        {shouldHydrate ? <Scripts /> : null}
        <LiveReload />
      </body>
    </html>
  );
}