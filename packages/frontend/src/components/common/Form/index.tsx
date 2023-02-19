import Button from "@mui/material/Button";
import { FormEvent, useState } from "react";

import styles from "./form.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;

  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

const Form = ({ title, children, handleSubmit }: Props) => {
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

      <Button disabled={isSubmitting} size="large" type="submit" variant="contained" fullWidth>
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
};

export default Form;
