import React from "react";
import Hero from "../components/Hero";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (title) => {
    console.log(`Navigating to: /${title}`);
    navigate(`/${title}`);
  };
  return (
    <>
      <Hero handleClick={handleClick} />
    </>
  );
};

export default Home;
