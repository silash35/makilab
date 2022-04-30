import TextField, { TextFieldProps } from "@mui/material/TextField";
import type { Client } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import styles from "./inputs.module.scss";

interface Props {
  client?: Client;
}

type vent = React.ChangeEvent<HTMLInputElement>;

export default function ClientInputs({ client }: Props) {
  const [name, setName] = useState("");
  const handleChangeName = (e: vent) => setName(e.target.value);

  const [email, setEmail] = useState("");
  const handleChangeEmail = (e: vent) => setEmail(e.target.value);

  const [cpfOrCnpj, setCpfOrCnpj] = useState("");
  const handleChangeCpfOrCnpj = (e: vent) => setCpfOrCnpj(e.target.value);

  const [address, setAddress] = useState("");
  const handleChangeAddress = (e: vent) => setAddress(e.target.value);

  const [zip, setZip] = useState("");
  const handleChangeZip = (e: vent) => setZip(e.target.value);

  const [whatsapp, setWhatsapp] = useState("");
  const handleChangeWhatsapp = (e: vent) => setWhatsapp(e.target.value);

  const [tel, setTel] = useState("");
  const handleChangeTel = (e: vent) => setTel(e.target.value);

  const [id, setId] = useState("");
  const handleChangeId = (e: vent) => setId(e.target.value);

  const setWithFilter = (set: Dispatch<SetStateAction<string>>, value?: number | string | null) => {
    if (value == undefined) {
      set("");
    } else {
      set(String(value));
    }
  };

  useEffect(() => {
    setWithFilter(setName, client?.name);
    setWithFilter(setEmail, client?.email);
    setWithFilter(setCpfOrCnpj, client?.cpfOrCnpj);
    setWithFilter(setAddress, client?.address);
    setWithFilter(setZip, client?.zip);
    setWithFilter(setWhatsapp, client?.whatsapp);
    setWithFilter(setTel, client?.tel);
    setWithFilter(setId, client?.id);
  }, [client]);

  const common = { variant: "outlined", margin: "normal", fullWidth: true } as TextFieldProps;

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
      <TextField
        name="email"
        label="E-mail"
        type={"email"}
        {...common}
        value={email}
        onChange={handleChangeEmail}
      />
      <TextField
        name="cpfOrCnpj"
        label="CPF ou CNPJ"
        value={cpfOrCnpj}
        onChange={handleChangeCpfOrCnpj}
        {...common}
      />

      <div className={styles.flex}>
        <TextField
          name="address"
          label="Endereço"
          {...common}
          value={address}
          onChange={handleChangeAddress}
        />
        <TextField name="zip" label="CEP" value={zip} onChange={handleChangeZip} {...common} />
      </div>
      <div className={styles.flex}>
        <TextField
          name="whatsapp"
          label="WhatsApp"
          value={whatsapp}
          onChange={handleChangeWhatsapp}
          placeholder="+55 71 99999-9999"
          {...common}
        />
        <TextField
          name="tel"
          label="Telefone"
          value={tel}
          onChange={handleChangeTel}
          placeholder="+55 71 99999-9999"
          {...common}
        />
      </div>

      <input type="hidden" name="clientID" value={id} onChange={handleChangeId} />
    </>
  );
}
