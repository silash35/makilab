import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useRef } from "react";

import styles from "./Form.module.scss";

export default function Form({ Inputs, URL, title, next }) {
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
    const res = await fetch(URL, request);
    const body = await res.json();

    if (res.status === 200) {
      router.push(next(body));
    } else {
      alert("ERRO: " + body.error);
    }
  };

  return (
    <form className={styles.form} ref={form} onSubmit={handleSubmit}>
      <h1>{title}</h1>

      <Inputs />

      <p>*Campo Obrigatório</p>
      <Button variant="contained" fullWidth size="large" type="submit">
        Cadastrar
      </Button>
    </form>
  );
}
