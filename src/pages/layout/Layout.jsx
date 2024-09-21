import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/layout/Header/Header";
import Footer from "../../components/layout/footer/Footer";
import SideDrawer from "../../components/drawer/SideDrawer";

const Layout = () => {
  return (
    <div>
      <Header />
      <SideDrawer /> {/* Ensure this is placed correctly */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
