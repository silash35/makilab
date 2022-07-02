import config from "@config";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import type TServiceOrder from "@/types/serviceOrder";

import DateTime from "./fields/DateTime";
import Text from "./fields/Text";
import styles from "./inputs.module.scss";

const { ATTENDANTS, SERVICE_PLACES, VOLTAGES_OPTIONS } = config;

interface Props {
  serviceOrder?: TServiceOrder;
}

export default function ServiceOrderInputs({ serviceOrder }: Props) {
  const common = { variant: "outlined", margin: "normal", fullWidth: true } as TextFieldProps;
  return (
    <>
      <div className={styles.flex}>
        <Text
          defaultValue={serviceOrder?.equipment}
          textFieldProps={{
            name: "equipment",
            label: "Equipamento",
            required: true,
            ...common,
          }}
        />

        <Autocomplete
          freeSolo
          options={VOLTAGES_OPTIONS}
          defaultValue={serviceOrder?.voltage ? serviceOrder?.voltage : VOLTAGES_OPTIONS[0]}
          renderInput={(params) => (
            <TextField {...params} name="voltage" label="Tensão" required {...common} />
          )}
          className={styles.minWidth}
        />
      </div>

      <div className={styles.flex}>
        <Text
          defaultValue={serviceOrder?.brand}
          textFieldProps={{ name: "brand", label: "Marca", ...common }}
        />
        <Text
          defaultValue={serviceOrder?.model}
          textFieldProps={{ name: "model", label: "Modelo", ...common }}
        />
      </div>

      <div className={styles.flex}>
        <Text
          defaultValue={serviceOrder?.productNumber}
          textFieldProps={{ name: "productNumber", label: "Product Number", ...common }}
        />
        <Text
          defaultValue={serviceOrder?.batchOrImei}
          textFieldProps={{ name: "batchOrImei", label: "N° de Serie ou IMEI", ...common }}
        />
      </div>

      <Text
        defaultValue={serviceOrder?.accessories}
        textFieldProps={{ name: "accessories", label: "Acessórios", ...common }}
      />

      <Text
        defaultValue={serviceOrder?.productCondition}
        textFieldProps={{ name: "productCondition", label: "Estado do equipamento", ...common }}
      />

      <Text
        defaultValue={serviceOrder?.problemDescription}
        textFieldProps={{ name: "problemDescription", label: "Defeitos do equipamento", ...common }}
      />

      <Text
        defaultValue={
          serviceOrder?.listOfServices ? serviceOrder?.listOfServices : "Avaliação Técnica"
        }
        textFieldProps={{ name: "listOfServices", label: "Lista de serviços", ...common }}
      />

      <div className={styles.flex}>
        <Autocomplete
          freeSolo
          options={ATTENDANTS}
          defaultValue={serviceOrder?.attendedBy}
          renderInput={(params) => (
            <TextField {...params} name="attendedBy" label="Atendente" required {...common} />
          )}
          className={styles.maxWidth}
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
          className={styles.maxWidth}
        />
      </div>
      <div className={styles.flex}>
        <DateTime
          name="createdAt"
          label="Data de criação da OS"
          defaultValue={serviceOrder?.createdAt}
          textFieldProps={{ required: true, ...common }}
        />

        <FormControlLabel
          control={
            <Checkbox name="isUnderWarranty" defaultChecked={serviceOrder?.isUnderWarranty} />
          }
          label="Garantia"
        />
      </div>

      <Text
        defaultValue={serviceOrder?.notes}
        textFieldProps={{ name: "notes", label: "Observações extras", multiline: true, ...common }}
      />
    </>
  );
}
