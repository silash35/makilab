import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { useRef } from "react";

import styles from "./clientForm.module.scss";

export default function ClientForm() {
  const router = useRouter();
  const form = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    var formData = new FormData(form.current);

    const data = Object.fromEntries(formData);

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await fetch("/api/admin/clients", request);

    if (res.status === 200) {
      router.push("/admin");
    } else {
      const body = await res.json();
      alert("ERRO: " + body.error);
    }
  };

  const common = { variant: "outlined", margin: "normal", fullWidth: true };
  const phoneCommon = {
    placeholder: "5571999999999",
    inputProps: { inputMode: "numeric", pattern: "[0-9]{8,13}" },
    ...common,
  };
  return (
    <form className={styles.form} ref={form} onSubmit={handleSubmit}>
      <h1>Cadastrar Cliente</h1>

      <TextField name="name" label="Nome completo" required {...common} />
      <TextField name="email" label="E-mail" type={"email"} {...common} />
      <TextField
        name="cpfOrCnpj"
        label="CPF ou CNPJ **"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]{11,14}" }}
        {...common}
      />

      <div className={styles.flex}>
        <TextField name="address" label="Endereço" {...common} />
        <TextField
          name="zip"
          label="CEP **"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]{8}" }}
          {...common}
        />
      </div>
      <div className={styles.flex}>
        <TextField name="whatsapp" label="WhatsApp **" {...phoneCommon} />
        <TextField name="tel" label="Telefone **" {...phoneCommon} />
      </div>

      <p>*Campo Obrigatório</p>
      <p>**Insira apenas números</p>

      <Button variant="contained" fullWidth color="primary" size="large" type="submit">
        Cadastrar
      </Button>
    </form>
  );
}
