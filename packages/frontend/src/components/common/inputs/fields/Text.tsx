import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useEffect, useState } from "react";

interface Props {
  defaultValue?: string | null;
  textFieldProps: Omit<TextFieldProps, "value" | "onChange">;
}

const Text = ({ defaultValue, textFieldProps }: Props) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : "");

  useEffect(() => {
    setValue(defaultValue ? defaultValue : "");
  }, [defaultValue]);

  return <TextField onChange={(e) => setValue(e.target.value)} value={value} {...textFieldProps} />;
};

export default Text;
