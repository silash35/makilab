import { TextFieldProps } from "@mui/material/TextField";

import type TClient from "@/types/client";

import Text from "./fields/Text";
import Flex from "./Flex";

interface Props {
  client?: TClient;
}

const ClientInputs = ({ client }: Props) => {
  const common = { variant: "outlined", margin: "normal", fullWidth: true } as TextFieldProps;

  return (
    <>
      <Text
        textFieldProps={{
          name: "name",
          label: "Nome completo",
          required: true,
          ...common,
        }}
        defaultValue={client?.name}
      />

      <Text
        textFieldProps={{
          name: "email",
          label: "E-mail",
          type: "email",
          ...common,
        }}
        defaultValue={client?.email}
      />

      <Text
        textFieldProps={{
          name: "cpfOrCnpj",
          label: "CPF ou CNPJ",
          ...common,
        }}
        defaultValue={client?.cpfOrCnpj}
      />

      <Flex>
        <Text
          textFieldProps={{
            name: "address",
            label: "Endereço",
            ...common,
          }}
          defaultValue={client?.address}
        />
        <Text
          textFieldProps={{
            name: "zip",
            label: "CEP",
            ...common,
          }}
          defaultValue={client?.zip}
        />
      </Flex>

      <Flex>
        <Text
          textFieldProps={{
            name: "whatsapp",
            label: "WhatsApp",
            placeholder: "+55 71 99999-9999",
            ...common,
          }}
          defaultValue={client?.whatsapp}
        />
        <Text
          textFieldProps={{
            name: "tel",
            label: "Telefone",
            placeholder: "+55 71 99999-9999",
            ...common,
          }}
          defaultValue={client?.whatsapp}
        />
      </Flex>
    </>
  );
};

export default ClientInputs;
