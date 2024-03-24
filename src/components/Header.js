import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navigation.css";
const Header = () => {
  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <NavLink style={navLinkStyle} to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink style={navLinkStyle} to="/about" activeClassName="active">
          About Us
        </NavLink>
      </ul>
    </nav>
  );
};

export default Header;

const navLinkStyle = {
  fontFamily: "Roboto,sans-serif",
  color: "#0B334E",
  textDecoration: "none",
  padding: "10px 20px",
  fontSize: 14,
  display: "inline",
};
const navStyle = {
  backgroundColor: "#FF8F77",
  padding: "10px 0",
  height: 60,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const ulStyle = {
  listStyleType: "none",
  margin: 0,
  padding: 0,
  textAlign: "center",
};
