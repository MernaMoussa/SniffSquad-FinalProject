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

  const genderOptions = ["Male", "Female"];

  const sizeOptions = [
    "Small",
    "Medium",
    "Large",
    "Extra Large",
    "Small / Medium",
    "Medium / Large",
    "Any Size",
  ];

  const ageOptions = [
    "Puppy (0-1 year)",
    "Young Adult (1-3 years)",
    "Adult (3-7 years)",
    "Senior (7+ years)",
    "Any Age",
  ];

  const energyLevelOptions = [
    "Couch Potato",
    "Low Energy",
    "Moderate Energy",
    "High Energy",
    "Very High Energy",
    "Active Athlete",
    "Any Energy Level",
  ];

  return (
    <div>
      <h1>Filter</h1>
      <FilterOptions
        label="Gender"
        labelId="gender-label"
        name="gender"
        options={genderOptions}
        defaultValue=""
        onChange={handleGenderChange}
      />
      <p>Selected Gender: {gender}</p>
      <FilterOptions
        label="Size"
        labelId="size-label"
        name="size"
        options={sizeOptions}
        defaultValue=""
        onChange={handleSizeChange}
      />
      <p>Selected Size: {size}</p>
      <FilterOptions
        label="Age"
        labelId="age-label"
        name="age"
        options={ageOptions}
        defaultValue=""
        onChange={handleAgeChange}
      />
      <p>Selected Age: {age}</p>
      <FilterOptions
        label="Energy Level"
        labelId="energy-level-label"
        name="energyLevel"
        options={energyLevelOptions}
        defaultValue=""
        onChange={handleEnergyLevelChange}
      />
      <p>Selected Energy Level: {energyLevel}</p>
    </div>
  );
};

export default DogFilterContainer;
