import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import styles from "./clientInputs.module.scss";

export default function Inputs({ client }) {
  const [name, setName] = useState("");
  const handleChangeName = (event) => setName(event.target.value);

  const [email, setEmail] = useState("");
  const handleChangeEmail = (event) => setEmail(event.target.value);

  const [cpfOrCnpj, setCpfOrCnpj] = useState("");
  const handleChangeCpfOrCnpj = (event) => setCpfOrCnpj(event.target.value);

  const [address, setAddress] = useState("");
  const handleChangeAddress = (event) => setAddress(event.target.value);

  const [zip, setZip] = useState("");
  const handleChangeZip = (event) => setZip(event.target.value);

  const [whatsapp, setWhatsapp] = useState("");
  const handleChangeWhatsapp = (event) => setWhatsapp(event.target.value);

  const [tel, setTel] = useState("");
  const handleChangeTel = (event) => setTel(event.target.value);

  const setWithFilter = (set, value) => {
    if (value == undefined) {
      set("");
    } else {
      set(value);
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
        label="CPF ou CNPJ **"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]{11,14}" }}
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
        <TextField
          name="zip"
          label="CEP **"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]{8}" }}
          value={zip}
          onChange={handleChangeZip}
          {...common}
        />
      </div>
      <div className={styles.flex}>
        <TextField
          name="whatsapp"
          label="WhatsApp **"
          value={whatsapp}
          onChange={handleChangeWhatsapp}
          {...phoneCommon}
        />
        <TextField
          name="tel"
          label="Telefone **"
          value={tel}
          onChange={handleChangeTel}
          {...phoneCommon}
        />
      </div>
    </>
  );
}
