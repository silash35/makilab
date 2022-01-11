import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import styles from "./clientInputs.module.scss";

export default function Inputs({ client }) {
  const [name, setName] = useState("");
  const handleChangeName = (event) => setName(event.target.value);

  useEffect(() => {
    setName(client.name);
  }, [client]);

  const common = { variant: "outlined", margin: "normal", fullWidth: true };
  const phoneCommon = {
    placeholder: "5571999999999",
    inputProps: { inputMode: "numeric", pattern: "[0-9]{8,13}" },
    ...common,
  };

  return (
    <>
      <TextField
        name="name"
        label="Nome completo"
        required
        {...common}
        value={name}
        onChange={handleChangeName}
      />
      <TextField name="email" label="E-mail" type={"email"} {...common} />
      <TextField
        name="cpfOrCnpj"
        label="CPF ou CNPJ **"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]{11,14}" }}
        {...common}
      />

      <div className={styles.flex}>
        <TextField name="address" label="Endereço" {...common} />
        <TextField
          name="zip"
          label="CEP **"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]{8}" }}
          {...common}
        />
      </div>
      <div className={styles.flex}>
        <TextField name="whatsapp" label="WhatsApp **" {...phoneCommon} />
        <TextField name="tel" label="Telefone **" {...phoneCommon} />
      </div>
    </>
  );
}
