import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useEffect, useState } from "react";

interface Props {
  defaultValue?: string | null;
  textFieldProps: Omit<TextFieldProps, "value" | "onChange">;
}

export default function Text({ defaultValue, textFieldProps }: Props) {
  const [value, setValue] = useState(defaultValue ? defaultValue : "");

  useEffect(() => {
    setValue(defaultValue ? defaultValue : "");
  }, [defaultValue]);

  return <TextField value={value} onChange={(e) => setValue(e.target.value)} {...textFieldProps} />;
}
