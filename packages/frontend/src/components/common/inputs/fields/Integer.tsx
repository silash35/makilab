import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useEffect, useState } from "react";

interface Props {
  defaultValue?: string | null;
  textFieldProps: Omit<TextFieldProps, "value" | "onChange">;
}

export default function Integer({ defaultValue, textFieldProps }: Props) {
  const [value, setValue] = useState(defaultValue ? defaultValue : "1");

  useEffect(() => {
    setValue(defaultValue ? defaultValue : "1");
  }, [defaultValue]);

  return (
    <TextField
      value={value}
      onChange={(e) => {
        const newValue = e.target.value.replace(/\D/g, "");
        if (newValue.length === 0) {
          setValue("0");
        } else {
          setValue(newValue);
        }
      }}
      {...textFieldProps}
    />
  );
}
