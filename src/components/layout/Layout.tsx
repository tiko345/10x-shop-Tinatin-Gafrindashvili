import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 flex-col min-w-0 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;