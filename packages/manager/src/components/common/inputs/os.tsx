import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type { Client } from "@prisma/client";
import { useEffect, useState } from "react";

import ClientInputs from "@/components/common/inputs/client";
import EquipmentInputs from "@/components/common/inputs/serviceOrder";
import useClients from "@/hooks/useClients";

interface ClientWithLabel extends Client {
  label: string;
}

const newClient: ClientWithLabel = { label: "Novo Cliente", id: 0 } as ClientWithLabel;

export default function OSInputs() {
  const { clients } = useClients();
  const [options, setOptions] = useState([newClient]);

  // const [selectorInputValue, setSelectorInputValue] = useState(options[0].label);
  const [clientSelectorValue, setClientSelectorValue] = useState(options[0]);

  useEffect(() => {
    if (Array.isArray(clients)) {
      const clientsWithLabel = clients.map((client) => {
        return { ...client, label: client.name };
      });

      const processedOptions = [newClient].concat(clientsWithLabel);

      setOptions(processedOptions);
    }
  }, [clients]);

  return (
    <>
      <h2>Dados do Cliente</h2>
      <Autocomplete
        options={options}
        value={clientSelectorValue}
        onChange={(e, newValue) => {
          if (newValue) setClientSelectorValue(newValue);
        }}
        /*
        inputValue={selectorInputValue}
        onInputChange={(e, newInputValue) => {
          setSelectorInputValue(newInputValue);
        }}
        */
        renderInput={(params) => <TextField {...params} label="Cliente" required />}
      />
      <ClientInputs client={clientSelectorValue} />

      <h2>Dados do Equipamento</h2>
      <EquipmentInputs />
    </>
  );
}
