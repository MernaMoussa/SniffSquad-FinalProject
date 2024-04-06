import React, { useState } from "react";
import FilterOptions from "./FilterOptions";
import { Button } from "@mui/material";

const DogFilterContainer = () => {
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");
  const [energyLevel, setEnergyLevel] = useState("");

  const resetFilters = () => {
    setGender("");
    setSize("");
    setAge("");
    setEnergyLevel("");
  };

  const genderOptions = ["Male", "Female"];

  const sizeOptions = [
    "Small",
    "Medium",
    "Large",
    "Extra Large",
    "Small/Medium",
    "Medium/Large",
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
        value={gender}
        onChange={setGender}
      />
      <p>Selected Gender: {gender}</p>
      <FilterOptions
        label="Size"
        labelId="size-label"
        name="size"
        options={sizeOptions}
        value={size}
        onChange={setSize}
      />
      <p>Selected Size: {size}</p>
      <FilterOptions
        label="Age"
        labelId="age-label"
        name="age"
        options={ageOptions}
        value={age}
        onChange={setAge}
      />
      <p>Selected Age: {age}</p>
      <FilterOptions
        label="Energy Level"
        labelId="energy-level-label"
        name="energyLevel"
        options={energyLevelOptions}
        value={energyLevel}
        onChange={setEnergyLevel}
      />
      <p>Selected Energy Level: {energyLevel}</p>
      <Button variant="contained" onClick={resetFilters}>
        Reset
      </Button>
    </div>
  );
};

export default DogFilterContainer;
