import Text from "./fields/text";
import { TextFieldProps } from "@mui/material/TextField";
import type TClient from "@/types/client";

import styles from "./inputs.module.scss";

interface Props {
  client?: TClient;
}

export default function ClientInputs({ client }: Props) {
  const common = { variant: "outlined", margin: "normal", fullWidth: true } as TextFieldProps;

  return (
    <>
      <Text
        defaultValue={client?.name}
        textFieldProps={{
          name: "name",
          label: "Nome completo",
          required: true,
          ...common,
        }}
      />

      <Text
        defaultValue={client?.email}
        textFieldProps={{
          name: "email",
          label: "E-mail",
          type: "email",
          ...common,
        }}
      />

      <Text
        defaultValue={client?.cpfOrCnpj}
        textFieldProps={{
          name: "cpfOrCnpj",
          label: "CPF ou CNPJ",
          ...common,
        }}
      />

      <div className={styles.flex}>
        <Text
          defaultValue={client?.address}
          textFieldProps={{
            name: "address",
            label: "Endereço",
            ...common,
          }}
        />
        <Text
          defaultValue={client?.zip}
          textFieldProps={{
            name: "zip",
            label: "CEP",
            ...common,
          }}
        />
      </div>

      <div className={styles.flex}>
        <Text
          defaultValue={client?.whatsapp}
          textFieldProps={{
            name: "whatsapp",
            label: "WhatsApp",
            placeholder: "+55 71 99999-9999",
            ...common,
          }}
        />
        <Text
          defaultValue={client?.whatsapp}
          textFieldProps={{
            name: "tel",
            label: "Telefone",
            placeholder: "+55 71 99999-9999",
            ...common,
          }}
        />
      </div>
    </>
  );
}
