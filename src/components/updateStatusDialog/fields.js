import DateTimePicker from "@mui/lab/DateTimePicker";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import styles from "./updateStatusDialog.module.scss";

const DateTime = ({ label, value, setValue, disabled }) => {
  return (
    <DateTimePicker
      label={label}
      renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
      value={value}
      disabled={disabled}
      onChange={(newValue) => {
        setValue(newValue);
      }}
    />
  );
};

const DateTimeWithSwitch = ({ label, input, setInput, children }) => {
  const [switchState, setSwitch] = useState(input != null);

  return (
    <>
      <div className={styles.flex}>
        <Switch
          checked={switchState}
          onChange={() => {
            setSwitch(!switchState);

            if (!switchState) {
              setInput(new Date());
            } else {
              setInput(null);
            }
          }}
        />

        <DateTime label={label} value={input} setValue={setInput} disabled={!switchState} />
      </div>

      {switchState && children}
    </>
  );
};

export { DateTime, DateTimeWithSwitch };
