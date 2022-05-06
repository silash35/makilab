import { TextFieldProps } from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { DateTimePickerProps } from "@mui/lab/DateTimePicker";
import DateTime from "./dateTime";

import styles from "../inputs.module.scss";

interface Props {
  name: string;
  label: string;
  children?: React.ReactNode;
  defaultValue?: string | null;
  textFieldProps?: Omit<TextFieldProps, "name" | "label" | "value" | "onChange">;
  dateTimePickerProps?: Omit<DateTimePickerProps, "name" | "label" | "value" | "onChange">;
}

export default function DateTimeWithSwitch({
  name,
  label,
  children,
  defaultValue,
  textFieldProps,
  dateTimePickerProps,
}: Props) {
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
    inputValue = null;
  }

  return (
    <>
      <div className={styles.flexNoWrap}>
        <Switch
          checked={switchState}
          onChange={() => {
            setSwitch(!switchState);
          }}
        />

        <DateTime
          name={name}
          label={label}
          defaultValue={inputValue}
          textFieldProps={textFieldProps}
          dateTimePickerProps={dateTimePickerProps}
        />
      </div>

      {switchState && children}
    </>
  );
}
