import TextField, { TextFieldProps } from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ptBR from "date-fns/locale/pt-BR";
import { useEffect, useState } from "react";

interface Props {
  name: string;
  label: string;
  defaultValue?: string | null;
  textFieldProps?: Omit<TextFieldProps, "name" | "label" | "value" | "onChange">;
  dateTimePickerProps?: Omit<
    DateTimePickerProps,
    "name" | "label" | "value" | "onChange" | "renderInput"
  >;
}

export default function DateTime({
  name,
  label,
  defaultValue,
  textFieldProps,
  dateTimePickerProps,
}: Props) {
  const [value, setValue] = useState<string | null>(defaultValue ? defaultValue : "");

  useEffect(() => {
    setValue(defaultValue ? defaultValue : "");
  }, [defaultValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <DateTimePicker
        label={label}
        renderInput={(params) => <TextField {...textFieldProps} {...params} />}
        value={value}
        onChange={(newValue) => setValue(newValue as string | null)}
        {...dateTimePickerProps}
      />

      <input type="hidden" name={name} value={String(value ? value : new Date())} />
    </LocalizationProvider>
  );
}
