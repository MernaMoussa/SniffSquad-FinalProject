import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
