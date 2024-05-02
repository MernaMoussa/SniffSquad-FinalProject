import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../constants/Header";
import Footer from "../constants/Footer";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
