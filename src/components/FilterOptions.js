import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const FilterOptions = (props) => {
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <FormControl>
      <FormLabel id={props.labelId}>{props.label}</FormLabel>
      <RadioGroup
        aria-labelledby={props.labelId}
        name={props.name}
        value={props.value}
        onChange={handleChange}
      >
        {props.options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default FilterOptions;
