import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import ClientInputs from "@/components/common/inputs/client";
import EquipmentInputs from "@/components/common/inputs/serviceOrder";
import useClients from "@/hooks/useClients";
import type Client from "@/types/client";

interface ClientWithLabel extends Client {
  id: number;
  label: string;
}

interface Props {
  setIsNewClient?: (isNewClient: boolean) => void;
}

const newClient: ClientWithLabel = { label: "Novo Cliente", id: 0 } as ClientWithLabel;

export default function OSInputs({ setIsNewClient }: Props) {
  const { clients } = useClients();
  const [options, setOptions] = useState([newClient]);

  const [clientSelectorValue, setClientSelectorValue] = useState(options[0]);

  if (setIsNewClient) {
    useEffect(() => {
      if (clientSelectorValue.id === 0 && clientSelectorValue.label === "Novo Cliente") {
        setIsNewClient(true);
      } else {
        setIsNewClient(false);
      }
    }, [clientSelectorValue]);
  }

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
        renderInput={(params) => <TextField {...params} label="Cliente" required />}
      />
      <ClientInputs client={clientSelectorValue} />

      <h2>Dados do Equipamento</h2>
      <EquipmentInputs />
    </>
  );
}
