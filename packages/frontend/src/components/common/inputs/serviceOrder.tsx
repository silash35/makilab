import config from "@config";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import type TServiceOrder from "@/types/serviceOrder";

import DateTime from "./fields/dateTime";
import Text from "./fields/text";
import styles from "./inputs.module.scss";

const { ATTENDANTS, SERVICE_PLACES } = config;

interface Props {
  serviceOrder?: TServiceOrder;
}

export default function ServiceOrderInputs({ serviceOrder }: Props) {
  const common = { variant: "outlined", margin: "normal", fullWidth: true } as TextFieldProps;
  return (
    <>
      <Text
        defaultValue={serviceOrder?.equipment}
        textFieldProps={{
          name: "equipment",
          label: "Equipamento",
          required: true,
          ...common,
        }}
      />

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
