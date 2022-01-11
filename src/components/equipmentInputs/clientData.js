import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import ClientInputs from "/src/components/clientInputs";

const novoCliente = { label: "Novo Cliente", id: 0 };

export default function ClientData({ selectorValue, setSelectorValue }) {
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

  return (
    <>
      <Autocomplete
        options={clients}
        value={selectorValue}
        onChange={(e, newValue) => {
          setSelectorValue(newValue);
        }}
        inputValue={selectorInputValue}
        onInputChange={(e, newInputValue) => {
          setSelectorInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Cliente" required />}
      />

      <ClientInputs client={selectorValue} />
    </>
  );
}
