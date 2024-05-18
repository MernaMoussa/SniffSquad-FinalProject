import React from "react";
import Hero from "../components/home/Hero";
import { useNavigate } from "react-router-dom";
import FeatureContainer from "../components/home/FeatureContainer";
import ObjectiveContainer from "../components/home/ObjectiveContainer";
import OfferingsContainer from "../components/home/OfferingsContainer";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (title) => {
    console.log(`Navigating to: /${title}`);
    navigate(`/${title}`);
  };
  return (
    <section>
      <Hero handleClick={handleClick} />
      <FeatureContainer />
      <ObjectiveContainer />
      <OfferingsContainer />
    </section>
  );
};

export default Home;
