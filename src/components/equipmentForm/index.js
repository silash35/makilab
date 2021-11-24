import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";

import styles from "./equipmentForm.module.scss";

const attendants = ["Rodrigo Icaro", "Silas Henrique"];

export default function EquipmentForm() {
  const common = { variant: "outlined", margin: "normal", fullWidth: true };

  return (
    <form className={styles.form} action="/api/admin/equipments" method="POST">
      <h1>Cadastrar Equipamento</h1>places
      <TextField
        name="id"
        label="N° da Ordem de Serviço"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        required
        {...common}
      />
      <TextField name="brand" label="Marca" required {...common} />
      <TextField name="model" label="Modelo" required {...common} />
      <Autocomplete
        freeSolo
        options={attendants.map((attendant) => attendant)}
        renderInput={(params) => (
          <TextField {...params} name="attendedBy" label="Atendente" required {...common} />
        )}
      />
      <FormGroup>
        <FormControlLabel control={<Checkbox name="isUnderWarranty" required />} label="Garantia" />
      </FormGroup>
      <Button variant="contained" color="primary" size="large" type="submit">
        Cadastrar
      </Button>
    </form>
  );
}
