import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useEffect, useState } from "react";

import centsToBRL from "@/utils/centsToBRL";

interface Props {
  defaultValue?: string | null;
  textFieldProps: Omit<TextFieldProps, "value" | "onChange">;
}

export default function Money({ defaultValue, textFieldProps }: Props) {
  const processValue = (value: string) => centsToBRL(Number(value));

  const [value, setValue] = useState(processValue(defaultValue ? defaultValue : "0"));
  useEffect(() => {
    setValue(processValue(defaultValue ? defaultValue : "0"));
  }, [defaultValue]);

  return (
    <TextField
      value={value}
      onChange={(e) => {
        const input = e.target.value.replace(/\D/g, "");
        setValue(processValue(input));
      }}
      {...textFieldProps}
    />
  );
}
