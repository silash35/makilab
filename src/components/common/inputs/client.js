import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import styles from "./inputs.module.scss";

export default function ClientInputs({ client }) {
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

  const [id, setId] = useState("");
  const handleChangeId = (event) => setId(event.target.value);

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
    setWithFilter(setId, client?.id);
  }, [client]);

  const common = { variant: "outlined", margin: "normal", fullWidth: true };

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
