import Button from "@mui/material/Button";
import type { FormEvent } from "react";

import styles from "./Form.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;

  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function Form({ title, children, handleSubmit }: Props) {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>{title}</h1>

      {children}

      <p>*Campo Obrigatório</p>
      <Button variant="contained" fullWidth size="large" type="submit">
        Cadastrar
      </Button>
    </form>
  );
}
