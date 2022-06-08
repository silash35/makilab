import Button from "@mui/material/Button";
import { FormEvent, useState } from "react";

import styles from "./form.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;

  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function Form({ title, children, handleSubmit }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitWrapper = async (event: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleSubmit(event);
    setIsSubmitting(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmitWrapper}>
      <h1>{title}</h1>

      {children}

      <p>*Campo Obrigatório</p>

      <Button variant="contained" fullWidth size="large" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
}
