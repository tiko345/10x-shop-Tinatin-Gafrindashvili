import { Link } from "react-router";

function NotFound() {
  return (
    <section className="px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>

      <p className="mt-4 text-gray-600">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 text-white hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
      >
        Go to catalog
      </Link>
    </section>
  );
}

export default NotFound;