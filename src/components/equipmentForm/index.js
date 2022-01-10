import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import ClientInputs from "./clientInputs";
import styles from "./equipmentForm.module.scss";
import EquipmentInputs from "./equipmentInputs";

export default function EquipmentForm() {
  const [clientSelectorValue, setClientSelectorValue] = useState({});
  const [dateValue, setDateValue] = useState(new Date());
  const router = useRouter();
  const form = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    var formData = new FormData(form.current);

    const data = Object.fromEntries(formData);

    data.createdAt = dateValue;

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await fetch("/api/admin/equipments", request);

    if (res.status === 200) {
      router.push("/admin");
    } else {
      const body = await res.json();
      alert("ERRO: " + body.error);
    }
  };

  return (
    <form className={styles.form} ref={form} onSubmit={handleSubmit}>
      <h1>Cadastrar Equipamento</h1>

      <h2>Dados do Cliente</h2>
      <ClientInputs selectorValue={clientSelectorValue} setSelectorValue={setClientSelectorValue} />

      <h2>Dados do Equipamento</h2>
      <EquipmentInputs dateValue={dateValue} setDateValue={setDateValue} />

      <p>*Campo Obrigatório</p>
      <p>**Insira apenas números</p>
      <Button variant="contained" fullWidth color="primary" size="large" type="submit">
        Cadastrar
      </Button>
    </form>
  );
}
