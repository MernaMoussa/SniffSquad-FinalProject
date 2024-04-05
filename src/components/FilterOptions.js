import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const FilterOptions = (props) => {
  const [value, setValue] = React.useState(props.defaultValue || "");

  const handleChange = (event) => {
    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">
        {props.formlabel}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {props.options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.toLowerCase()}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default FilterOptions;
