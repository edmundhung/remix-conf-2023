import { Outlet } from "@remix-run/react";

export default function Layout() {
  return (
      <div className="flex min-h-full flex-col justify-center py-12 pb-36 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Demo</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <Outlet />
          </div>
        </div>
      </div>
  );
}