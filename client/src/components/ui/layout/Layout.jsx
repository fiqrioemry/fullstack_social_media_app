import { Outlet } from "react-router-dom";
import Header from "./Navbar";
import Navbar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
