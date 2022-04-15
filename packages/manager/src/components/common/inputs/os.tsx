import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type { Client } from "@prisma/client";
import { useEffect, useState } from "react";

import ClientInputs from "@/components/common/inputs/client";
import EquipmentInputs from "@/components/common/inputs/serviceOrder";
import request from "@/utils/frontend/request";

interface ClientWithLabel extends Client {
  label: string;
}

const novoCliente: ClientWithLabel = { label: "Novo Cliente", id: 0 } as ClientWithLabel;

export default function OSInputs() {
  const [clients, setClients] = useState([novoCliente]);
  const [selectorInputValue, setSelectorInputValue] = useState(clients[0].label);
  const [clientSelectorValue, setClientSelectorValue] = useState(clients[0]);

  const load = async () => {
    const data = await request("/api/admin/clients", "GET");

    if (Array.isArray(data)) {
      const options = [novoCliente].concat(data);

      const processedOptions = options.map((client) => {
        return { ...client, label: client.name };
      });
      setClients(processedOptions);
    } else {
      return null;
    }
  };

  useEffect(() => {
    setClientSelectorValue(novoCliente);
    load();
  }, []);

  return (
    <>
      <h2>Dados do Cliente</h2>
      <Autocomplete
        options={clients}
        value={clientSelectorValue}
        onChange={(e, newValue) => {
          if (newValue) setClientSelectorValue(newValue);
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
