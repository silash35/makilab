import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import type { FormEvent } from "react";

import request from "@/utils/frontend/request";

import styles from "./Form.module.scss";

interface Props {
  Inputs: React.ReactChild;
  URL: string;
  method?: "POST" | "PUT";
  title: string;
  next: (response: unknown) => string;
}

export default function Form({ Inputs, URL, method = "POST", title, next }: Props) {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    const json = await request(URL, method, data);
    if (json != "ERROR") {
      router.push(next(json));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>{title}</h1>

      {Inputs}

      <p>*Campo Obrigatório</p>
      <Button variant="contained" fullWidth size="large" type="submit">
        Cadastrar
      </Button>
    </form>
  );
}
