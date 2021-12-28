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
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import styles from "./equipmentForm.module.scss";

const attendants = ["Rodrigo Ícaro", "Silas Henrique", "Amanda Pimenta", "Rai Neto"];

export default function EquipmentForm() {
  const [dateValue, setDateValue] = useState(new Date());
  const router = useRouter();
  const form = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    var formData = new FormData(form.current);

    const data = Object.fromEntries(formData);

    data.createdAt = dateValue;

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await fetch("/api/admin/equipments", request);

    if (res.status === 200) {
      router.push("/admin");
    } else {
      const body = await res.json();
      alert("ERRO: " + body.error);
    }
  };

  const common = { variant: "outlined", margin: "normal", fullWidth: true };
  return (
    <form className={styles.form} ref={form} onSubmit={handleSubmit}>
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
