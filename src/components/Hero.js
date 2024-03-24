import React from "react";
import Title from "./Title";
import Paragraph from "./Paragraph";
import { Button } from "react-bootstrap";

const Hero = ({ handleClick }) => {
  return (
    <div style={heroStyle}>
      <Title title="Dogs meet" className="hero-title" />
      <Title title="and owners Greet" className="hero-title" />

      <Paragraph
        paragraph="Owning a pet brings boundless joy, a loyal companion, and a constant source of happiness. With our diverse range of 200+ pets, find the ideal match for your furry friend today"
        className="hero-paragraph mb-5"
      />

      <Button
        className="button trans-button "
        onClick={() => handleClick("login")}
      >
        Login
      </Button>
      <Button
        className="button glow-button ms-5"
        onClick={() => handleClick("register")}
      >
        Register Now
      </Button>
    </div>
  );
};

export default Hero;

const heroStyle = {
  backgroundImage: `url(${require("../bg-img/bg-hero.png")})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "5% 5%",
  height: "600px",
};
