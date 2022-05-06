import MCheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useEffect, useState } from "react";

interface Props {
  name: string;
  label: string;
  defaultValue: boolean;
}

export default function Checkbox({ name, label, defaultValue }: Props) {
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
              checked={value}
              onChange={(e) => {
                setValue(e.target.checked);
              }}
            />
          }
          label="Orçamento Aprovado"
        />
      </FormGroup>
      <input type="hidden" name={name} value={Number(value)} />
    </>
  );
}
