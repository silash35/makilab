import { useState } from "react";

import ClientData from "./clientData";
import EquipmentData from "./equipmentData";

export default function EquipmentForm() {
  const [clientSelectorValue, setClientSelectorValue] = useState({});
  const [dateValue, setDateValue] = useState(new Date());

  return (
    <>
      <h2>Dados do Cliente</h2>
      <ClientData selectorValue={clientSelectorValue} setSelectorValue={setClientSelectorValue} />

      <h2>Dados do Equipamento</h2>
      <EquipmentData dateValue={dateValue} setDateValue={setDateValue} />
    </>
  );
}