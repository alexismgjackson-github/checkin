import { Outlet } from "react-router";
import Header from "./Header";
import "./Layout.css";

export default function Layout() {
  return (
    <>
      {/* Render the Header component */}
      <Header />

      {/* Main content area where nested routes will be rendered */}
      <main>
        <Outlet />
      </main>
    </>
  );
}
