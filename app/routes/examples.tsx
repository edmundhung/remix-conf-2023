import { Form, Outlet, useLocation } from "@remix-run/react";
import { useShouldHydrate } from "~/root";

export default function Layout() {
  const shouldHydrate = useShouldHydrate();
  const location = useLocation();

  return (
    <div className="flex min-h-full flex-col justify-center py-12 pb-36 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Demo
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div id="example" className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
      </div>
      
      <Form className="mx-auto mt-6" method="get" action={location.pathname} reloadDocument>
        <div className="flex items-center">
          <button
            type="submit"
            name="hydrate"
            value={shouldHydrate ? "no" : "yes"}
            className={`${
              shouldHydrate ? "bg-indigo-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
          >
            <span
              aria-hidden="true"
              className={`${
                shouldHydrate ? "translate-x-5" : "translate-x-0"
              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            ></span>
          </button>
          <span className="ml-3 text-sm">
            <span className="font-medium text-gray-900">{shouldHydrate ? 'JS Enabled' : 'JS Disabled'}</span>
          </span>
        </div>
      </Form>
    </div>
  );
}
