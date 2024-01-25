import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale";
import { ComponentProps, useEffect, useState } from "react";

interface Props {
  name: string;
  label: string;
  defaultValue?: string | null | "none";
  textFieldProps?: Omit<ComponentProps<typeof TextField>, "name" | "label" | "value" | "onChange">;
  dateTimePickerProps?: Omit<
    ComponentProps<typeof DateTimePicker>,
    "name" | "label" | "value" | "onChange" | "renderInput"
  >;
}

const DateTime = ({ name, label, defaultValue, textFieldProps, dateTimePickerProps }: Props) => {
  let initialValue: string | null | "none";

  if (defaultValue) {
    if (defaultValue === "none") {
      initialValue = null;
    } else {
      initialValue = defaultValue;
    }
  } else {
    initialValue = new Date().toISOString();
  }

  const [value, setValue] = useState<string | null>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [defaultValue]);

  return (
    <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label={label}
        onChange={(newValue) => setValue(newValue as string | null)}
        slotProps={{ textField: textFieldProps }}
        value={value}
        {...dateTimePickerProps}
      />

      <input name={name} type="hidden" value={value ? new Date(value).toISOString() : ""} />
    </LocalizationProvider>
  );
};

export default DateTime;
