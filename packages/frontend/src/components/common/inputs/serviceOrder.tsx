import config from "@config";
import DateAdapter from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import type { ServiceOrder } from "@prisma/client";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";

import styles from "./inputs.module.scss";

const { ATTENDANTS, SERVICE_PLACES } = config;

interface Props {
  serviceOrder?: ServiceOrder;
}

export default function ServiceOrderInputs({ serviceOrder }: Props) {
  const [dateValue, setDateValue] = useState<Date | null>(
    serviceOrder?.createdAt ? new Date(serviceOrder?.createdAt) : new Date()
  );

  const common = { variant: "outlined", margin: "normal", fullWidth: true } as TextFieldProps;
  return (
    <>
      <input type="hidden" name="id" value={serviceOrder?.id} />
      <TextField
        name="equipment"
        label="Equipamento"
        required
        defaultValue={serviceOrder?.equipment}
        {...common}
      />
      <div className={styles.flex}>
        <TextField name="brand" label="Marca" defaultValue={serviceOrder?.brand} {...common} />
        <TextField name="model" label="Modelo" defaultValue={serviceOrder?.model} {...common} />
      </div>
      <div className={styles.flex}>
        <TextField
          name="productNumber"
          label="Product Number"
          defaultValue={serviceOrder?.productNumber}
          {...common}
        />
        <TextField
          name="batchOrImei"
          label="N° de Serie ou IMEI"
          defaultValue={serviceOrder?.batchOrImei}
          {...common}
        />
      </div>
      <TextField
        name="accessories"
        label="Acessórios"
        defaultValue={serviceOrder?.accessories}
        {...common}
      />
      <TextField
        name="productCondition"
        label="Estado do equipamento"
        defaultValue={serviceOrder?.productCondition}
        {...common}
      />
      <TextField
        name="listOfServices"
        label="Lista de serviços"
        defaultValue={
          serviceOrder?.listOfServices ? serviceOrder?.listOfServices : "Avaliação Técnica"
        }
        {...common}
      />

      <div className={styles.flex}>
        <Autocomplete
          freeSolo
          options={ATTENDANTS}
          defaultValue={serviceOrder?.attendedBy}
          renderInput={(params) => (
            <TextField {...params} name="attendedBy" label="Atendente" required {...common} />
          )}
          className={styles.width}
        />

        <Autocomplete
          freeSolo
          options={SERVICE_PLACES}
          defaultValue={serviceOrder?.attendedOn ? serviceOrder?.attendedOn : SERVICE_PLACES[0]}
          renderInput={(params) => (
            <TextField
              {...params}
              name="attendedOn"
              label="Local de atendimento"
              required
              {...common}
            />
          )}
          className={styles.width}
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

          <input
            type="hidden"
            name="createdAt"
            value={String(dateValue ? dateValue : new Date())}
          />
        </LocalizationProvider>

        <FormControlLabel
          control={
            <Checkbox name="isUnderWarranty" defaultChecked={serviceOrder?.isUnderWarranty} />
          }
          label="Garantia"
        />
      </div>

      <TextField
        name="notes"
        label="Observações extras"
        defaultValue={serviceOrder?.notes}
        multiline
        {...common}
      />
    </>
  );
}
