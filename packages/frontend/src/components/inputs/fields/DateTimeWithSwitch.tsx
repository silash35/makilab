import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import type TextField from "@mui/material/TextField";
import type { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ComponentProps, useEffect, useState } from "react";

import DateTime from "./DateTime";

interface Props {
  name: string;
  label: string;
  children?: React.ReactNode;
  defaultValue?: string | null;
  textFieldProps?: Omit<ComponentProps<typeof TextField>, "name" | "label" | "value" | "onChange">;
  dateTimePickerProps?: Omit<
    ComponentProps<typeof DateTimePicker>,
    "name" | "label" | "value" | "onChange"
  >;
}

const DateTimeWithSwitch = ({
  name,
  label,
  children,
  defaultValue,
  textFieldProps,
  dateTimePickerProps,
}: Props) => {
  const [switchState, setSwitch] = useState(defaultValue == null);

  useEffect(() => {
    setSwitch(defaultValue != null);
  }, [defaultValue]);

  let inputValue;
  if (switchState) {
    if (defaultValue == null) {
      inputValue = new Date().toISOString();
    } else {
      inputValue = defaultValue;
    }
  } else {
    inputValue = "none";
  }

  return (
    <>
      <Stack alignItems="center" direction="row" gap={1} minWidth={400}>
        <Switch
          onChange={() => {
            setSwitch(!switchState);
          }}
          checked={switchState}
        />

        <DateTime
          dateTimePickerProps={dateTimePickerProps}
          defaultValue={inputValue}
          label={label}
          name={name}
          textFieldProps={textFieldProps}
        />
      </Stack>

      {switchState && children}
    </>
  );
};

export default DateTimeWithSwitch;
