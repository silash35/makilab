import MCheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useEffect, useState } from "react";

interface Props {
  name: string;
  label: string;
  defaultValue: boolean;
}

const Checkbox = ({ name, label, defaultValue }: Props) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue ? true : false);
  }, [defaultValue]);

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <MCheckbox
              onChange={(e) => {
                setValue(e.target.checked);
              }}
              checked={value}
            />
          }
          label={label}
        />
      </FormGroup>
      <input name={name} type="hidden" value={Number(value)} />
    </>
  );
};

export default Checkbox;
