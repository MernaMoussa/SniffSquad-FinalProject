import React from "react";

const Title = ({ header, title, className }) => {
  const HeaderTag = header || "h1";
  return <HeaderTag className={className}>{title}</HeaderTag>;
};

export default Title;
