import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useEffect, useState } from "react";
import DateAdapter from "@mui/lab/AdapterDateFns";
import DateTimePicker, { DateTimePickerProps } from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ptBR from "date-fns/locale/pt-BR";

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
    <LocalizationProvider dateAdapter={DateAdapter} locale={ptBR}>
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
