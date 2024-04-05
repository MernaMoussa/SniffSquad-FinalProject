import React, { useState } from "react";
import Select from "./Select";

const FilterDogs = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
  return (
    <div>
      <h1>Choose an option:</h1>
      <Select
        formlabel="Select Gender"
        defaultValue="female"
        options={["Male", "Female"]}
        onChange={handleOptionChange}
      />
      <p>Selected Option: {selectedOption}</p>
    </div>
  );
};

export default FilterDogs;
