import React from "react";

const Footer = () => {
  const containerStyle = {
    backgroundColor: "#FF8F77",
    color: "#0B334E",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    bottom: 0,
    width: "100%",
  };
  return (
    <div style={containerStyle}>
      <p>&copy; 2024 Your Website. All rights reserved.</p>
    </div>
  );
};

export default Footer;
