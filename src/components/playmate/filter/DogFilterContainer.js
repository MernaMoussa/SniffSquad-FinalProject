import React, { useState } from "react";
import FilterOptions from "./FilterOptions";
import { Button } from "@mui/material";
import {
  genderOptions,
  sizeOptions,
  ageOptions,
  energyLevelOptions,
} from "../../../common/DogOptions";

const DogFilterContainer = ({ handleFiltering }) => {
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");
  const [energyLevel, setEnergyLevel] = useState("");

  const scrollToPosition = document.getElementById("filter-section");

  const applyFilters = () => {
    handleFiltering(gender, size, age, energyLevel);
    window.scrollTo({ top: scrollToPosition.offsetTop, behavior: "smooth" });
  };

  const resetFilters = () => {
    setGender("");
    setSize("");
    setAge("");
    setEnergyLevel("");
    handleFiltering("", "", "", "");
    window.scrollTo({ top: scrollToPosition.offsetTop, behavior: "smooth" });
  };

  return (
    <div>
      <h1 color="primary.main">Filter</h1>
      <div>
        <FilterOptions
          label="Gender"
          labelId="gender-label"
          name="gender"
          options={genderOptions}
          value={gender}
          onChange={setGender}
        />
      </div>
      <div>
        <FilterOptions
          label="Size"
          labelId="size-label"
          name="size"
          options={sizeOptions}
          value={size}
          onChange={setSize}
        />
      </div>
      <div>
        <FilterOptions
          label="Age"
          labelId="age-label"
          name="age"
          options={ageOptions}
          value={age}
          onChange={setAge}
        />
      </div>
      <div>
        <FilterOptions
          label="Energy Level"
          labelId="energy-level-label"
          name="energyLevel"
          options={energyLevelOptions}
          value={energyLevel}
          onChange={setEnergyLevel}
        />
      </div>
      <Button variant="contained" onClick={resetFilters}>
        Reset
      </Button>
      <Button variant="contained" onClick={applyFilters}>
        Apply Filters
      </Button>
    </div>
  );
};

export default DogFilterContainer;
