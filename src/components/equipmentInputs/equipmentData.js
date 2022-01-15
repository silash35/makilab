import DateAdapter from "@mui/lab/AdapterDayjs";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import ptBR from "dayjs/locale/pt-br";
import { useState } from "react";

import styles from "./equipmentInputs.module.scss";

const attendants = ["Rodrigo Ícaro", "Silas Henrique", "Amanda Pimenta", "Rai Neto"];
const servicePlace = ["Balcão", "Telefone"];

export default function EquipmentInputs({ equipment = {} }) {
  const [dateValue, setDateValue] = useState(new Date(equipment.createdAt));

  const common = { variant: "outlined", margin: "normal", fullWidth: true };
  return (
    <>
      <input type="hidden" name="id" value={equipment.id} />
      <TextField
        name="equipment"
        label="Equipamento"
        required
        defaultValue={equipment.name}
        {...common}
      />
      <div className={styles.flex}>
        <TextField name="brand" label="Marca" defaultValue={equipment.brand} {...common} />
        <TextField name="model" label="Modelo" defaultValue={equipment.model} {...common} />
      </div>
      <div className={styles.flex}>
        <TextField
          name="productNumber"
          label="Product Number"
          defaultValue={equipment.productNumber}
          {...common}
        />
        <TextField
          name="batchOrImei"
          label="N° de Serie ou IMEI"
          defaultValue={equipment.batchOrImei}
          {...common}
        />
      </div>
      <TextField
        name="accessories"
        label="Acessórios"
        defaultValue={equipment.accessories}
        {...common}
      />
      <TextField
        name="productCondition"
        label="Estado do equipamento"
        defaultValue={equipment.productCondition}
        {...common}
      />
      <TextField
        name="listOfServices"
        label="Lista de serviços"
        defaultValue={equipment.listOfServices ? equipment.listOfServices : "Avaliação Técnica"}
        {...common}
      />

      <div className={styles.flex}>
        <Autocomplete
          freeSolo
          options={attendants}
          defaultValue={equipment.attendedBy}
          renderInput={(params) => (
            <TextField {...params} name="attendedBy" label="Atendente" required {...common} />
          )}
          sx={{ width: "100%" }}
        />

        <Autocomplete
          freeSolo
          options={servicePlace}
          defaultValue={equipment.attendedOn ? equipment.attendedOn : servicePlace[0]}
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

        <FormControlLabel
          control={<Checkbox name="isUnderWarranty" defaultChecked={equipment.isUnderWarranty} />}
          label="Garantia"
        />
      </div>
    </>
  );
}
