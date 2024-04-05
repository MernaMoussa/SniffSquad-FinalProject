import React, { useState } from "react";
import FilterOptions from "./FilterOptions";

const DogFilterContainer = () => {
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");
  const [energyLevel, setEnergyLevel] = useState("");

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleSizeChange = (value) => {
    setSize(value);
  };

  const handleAgeChange = (value) => {
    setAge(value);
  };

  const handleEnergyLevelChange = (value) => {
    setEnergyLevel(value);
  };
  return (
    <div>
      <h1>Filter</h1>
      <FilterOptions
        formlabel="Gender"
        defaultValue=""
        options={["Male", "Female"]}
        onChange={handleGenderChange}
      />
      <p>Selected Option: {gender}</p>
      <FilterOptions
        formlabel="Size"
        defaultValue=""
        options={[
          "Small",
          "Medium",
          "Large",
          "Extra Large",
          "Small / Medium",
          "Medium / Large",
          "Any Size",
        ]}
        onChange={handleSizeChange}
      />
      <p>Selected Option: {size}</p>
      <FilterOptions
        formlabel="Age"
        defaultValue=""
        options={[
          "Puppy (0-1 year)",
          "Young Adult (1-3 years)",
          "Adult (3-7 years)",
          "Senior (7+ years)",
          "Any Age",
        ]}
        onChange={handleAgeChange}
      />
      <p>Selected Option: {age}</p>
      <FilterOptions
        formlabel="Energy Level"
        defaultValue=""
        options={[
          "Couch Potato",
          "Low Energy",
          "Moderate Energy",
          "High Energy",
          "Very High Energy",
          "Active Athlete",
          "Any Energy Level",
        ]}
        onChange={handleEnergyLevelChange}
      />
      <p>Selected Option: {energyLevel}</p>
    </div>
  );
};

export default DogFilterContainer;
