import { NavLink } from "react-router";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">

        <NavLink
          to="/"
          className="text-lg font-bold text-blue-600"
        >
          10X Shop
        </NavLink>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} 10X Shop. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;