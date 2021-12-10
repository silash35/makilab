import DateAdapter from "@mui/lab/AdapterDayjs";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import ptBR from "dayjs/locale/pt-br";
import { useState } from "react";

import styles from "./equipmentForm.module.scss";

const attendants = ["Rodrigo Icaro", "Silas Henrique", "Amanda Pimenta"];

export default function EquipmentForm() {
  const [dateValue, setDateValue] = useState(new Date());

  const common = { variant: "outlined", margin: "normal", fullWidth: true };

  return (
    <form className={styles.form} action="/api/admin/equipments" method="POST">
      <h1>Cadastrar Equipamento</h1>
      <TextField
        name="OS_number"
        label="N° da Ordem de Serviço"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        required
        {...common}
      />
      <TextField name="name" label="Equipamento" required {...common} />
      <TextField name="brand" label="Marca" {...common} />
      <TextField name="model" label="Modelo" {...common} />
      <Autocomplete
        freeSolo
        options={attendants.map((attendant) => attendant)}
        renderInput={(params) => (
          <TextField {...params} name="attendedBy" label="Atendente" required {...common} />
        )}
      />
      <div className={styles.flex}>
        <LocalizationProvider dateAdapter={DateAdapter} locale={ptBR}>
          <DateTimePicker
            label="Data de criação da OS"
            renderInput={(params) => (
              <TextField name="createdAt" required {...common} {...params} />
            )}
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
            }}
          />
        </LocalizationProvider>

        <FormGroup>
          <FormControlLabel control={<Checkbox name="isUnderWarranty" />} label="Garantia" />
        </FormGroup>
      </div>
      <Button variant="contained" fullWidth color="primary" size="large" type="submit">
        Cadastrar
      </Button>
    </form>
  );
}
