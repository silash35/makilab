import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import ClientInputs from "@/components/common/inputs/client";
import EquipmentInputs from "@/components/common/inputs/equipment";
import request from "@/utils/frontend/request";

const novoCliente = { label: "Novo Cliente", id: 0 };

export default function OSInputs() {
  const [clients, setClients] = useState([novoCliente]);
  const [selectorInputValue, setSelectorInputValue] = useState(clients[0].label);
  const [clientSelectorValue, setClientSelectorValue] = useState(clients[0]);

  const load = async () => {
    const data = await request("/api/admin/clients", "GET");

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
    setClientSelectorValue(novoCliente);
    await load();
  }, []);

  return (
    <>
      <h2>Dados do Cliente</h2>
      <Autocomplete
        options={clients}
        value={clientSelectorValue}
        onChange={(e, newValue) => {
          setClientSelectorValue(newValue);
        }}
        inputValue={selectorInputValue}
        onInputChange={(e, newInputValue) => {
          setSelectorInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Cliente" required />}
      />
      <ClientInputs client={clientSelectorValue} />

      <h2>Dados do Equipamento</h2>
      <EquipmentInputs />
    </>
  );
}
