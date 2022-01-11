import DateAdapter from "@mui/lab/AdapterDayjs";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import ptBR from "dayjs/locale/pt-br";

import styles from "./equipmentInputs.module.scss";

const attendants = ["Rodrigo Ícaro", "Silas Henrique", "Amanda Pimenta", "Rai Neto"];
const servicePlace = ["Balcão", "Telefone"];

export default function EquipmentInputs({ dateValue, setDateValue }) {
  const common = { variant: "outlined", margin: "normal", fullWidth: true };
  return (
    <>
      <TextField
        name="OS_number"
        label="N° da Ordem de Serviço"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        required
        {...common}
      />
      <TextField name="equipment" label="Equipamento" required {...common} />
      <div className={styles.flex}>
        <TextField name="brand" label="Marca" {...common} />
        <TextField name="model" label="Modelo" {...common} />
      </div>
      <div className={styles.flex}>
        <TextField name="product_number" label="Product Number" {...common} />
        <TextField name="batchOrImei" label="N° de Serie ou IMEI" {...common} />
      </div>
      <TextField name="accessories" label="Acessórios" {...common} />
      <TextField name="productCondition" label="Estado do equipamento" {...common} />
      <TextField
        name="listOfServices"
        label="Lista de serviços"
        defaultValue={"Avaliação Técnica"}
        {...common}
      />

      <div className={styles.flex}>
        <Autocomplete
          freeSolo
          options={attendants}
          renderInput={(params) => (
            <TextField {...params} name="attendedBy" label="Atendente" required {...common} />
          )}
          sx={{ width: "100%" }}
        />

        <Autocomplete
          freeSolo
          options={servicePlace}
          defaultValue={servicePlace[0]}
          renderInput={(params) => (
            <TextField
              {...params}
              name="attendedOn"
              label="Local de atendimento"
              required
              {...common}
            />
          )}
          sx={{ width: "100%" }}
        />
      </div>
      <div className={styles.flex}>
        <LocalizationProvider dateAdapter={DateAdapter} locale={ptBR}>
          <DateTimePicker
            label="Data de criação da OS"
            renderInput={(params) => <TextField required {...common} {...params} />}
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
            }}
          />

          <input type="hidden" name="createdAt" value={dateValue} />
        </LocalizationProvider>

        <FormGroup>
          <FormControlLabel control={<Checkbox name="isUnderWarranty" />} label="Garantia" />
        </FormGroup>
      </div>
    </>
  );
}
