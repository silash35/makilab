import config from "@config";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import type TServiceOrder from "@/types/serviceOrder";

import DateTime from "./fields/DateTime";
import Text from "./fields/Text";
import Flex from "./Flex";

const { ATTENDANTS, SERVICE_PLACES, VOLTAGES_OPTIONS } = config;

interface Props {
  serviceOrder?: TServiceOrder;
}

const ServiceOrderInputs = ({ serviceOrder }: Props) => {
  const common = { variant: "outlined", margin: "normal", fullWidth: true } as TextFieldProps;
  return (
    <>
      <Flex>
        <Text
          textFieldProps={{
            name: "equipment",
            label: "Equipamento",
            required: true,
            ...common,
          }}
          defaultValue={serviceOrder?.equipment}
        />

        <Autocomplete
          renderInput={(params) => (
            <TextField {...params} label="Tensão" name="voltage" required {...common} />
          )}
          defaultValue={serviceOrder?.voltage ? serviceOrder?.voltage : VOLTAGES_OPTIONS[0]}
          options={VOLTAGES_OPTIONS}
          sx={{ minWidth: 200, width: { xs: "100%", md: "auto" } }}
          freeSolo
        />
      </Flex>

      <Flex>
        <Text
          defaultValue={serviceOrder?.brand}
          textFieldProps={{ name: "brand", label: "Marca", ...common }}
        />
        <Text
          defaultValue={serviceOrder?.model}
          textFieldProps={{ name: "model", label: "Modelo", ...common }}
        />
      </Flex>

      <Flex>
        <Text
          defaultValue={serviceOrder?.productNumber}
          textFieldProps={{ name: "productNumber", label: "Product Number", ...common }}
        />
        <Text
          defaultValue={serviceOrder?.batchOrImei}
          textFieldProps={{ name: "batchOrImei", label: "N° de Serie ou IMEI", ...common }}
        />
      </Flex>

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

      <Flex>
        <Autocomplete
          renderInput={(params) => (
            <TextField {...params} label="Atendente" name="attendedBy" required {...common} />
          )}
          defaultValue={serviceOrder?.attendedBy}
          options={ATTENDANTS}
          freeSolo
          fullWidth
        />

        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Local de atendimento"
              name="attendedOn"
              required
              {...common}
            />
          )}
          defaultValue={serviceOrder?.attendedOn ? serviceOrder?.attendedOn : SERVICE_PLACES[0]}
          options={SERVICE_PLACES}
          sx={{ width: "100%" }}
          freeSolo
          fullWidth
        />
      </Flex>
      <Flex>
        <DateTime
          defaultValue={serviceOrder?.createdAt}
          label="Data de criação da OS"
          name="createdAt"
          textFieldProps={{ required: true, ...common }}
        />

        <FormControlLabel
          control={
            <Checkbox defaultChecked={serviceOrder?.isUnderWarranty} name="isUnderWarranty" />
          }
          label="Garantia"
        />
      </Flex>

      <Text
        defaultValue={serviceOrder?.notes}
        textFieldProps={{ name: "notes", label: "Observações extras", multiline: true, ...common }}
      />
    </>
  );
};

export default ServiceOrderInputs;
