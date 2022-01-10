import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

const novoCliente = { label: "Novo Cliente", id: 0 };

export default function ClientInputs({ selectorValue, setSelectorValue }) {
  const [clients, setClients] = useState([novoCliente]);
  const [selectorInputValue, setSelectorInputValue] = useState(clients[0].label);

  const load = async () => {
    const res = await fetch("/api/admin/clients", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      const options = [novoCliente].concat(data);

      const processedOptions = options.map((client) => {
        return { label: client.name, ...client };
      });
      setClients(processedOptions);
    } else {
      return null;
    }
  };

  useEffect(async () => {
    setSelectorValue(novoCliente);
    await load();
  }, []);

  const common = { variant: "outlined", margin: "normal", fullWidth: true };

  return (
    <>
      <Autocomplete
        value={selectorValue}
        onChange={(e, newValue) => {
          setSelectorValue(newValue);
        }}
        inputValue={selectorInputValue}
        onInputChange={(e, newInputValue) => {
          setSelectorInputValue(newInputValue);
        }}
        options={clients}
        renderInput={(params) => <TextField {...params} label="Cliente" />}
      />

      <TextField
        name="name"
        label="Nome completo"
        defaultValue={selectorValue.name}
        required
        {...common}
      />
      <TextField
        name="email"
        label="E-mail"
        defaultValue={selectorValue.email}
        type={"email"}
        {...common}
      />
      <TextField
        name="cpfOrCnpj"
        label="CPF ou CNPJ **"
        defaultValue={selectorValue.cpfOrCnpj}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]{11,14}" }}
        {...common}
      />
    </>
  );
}
