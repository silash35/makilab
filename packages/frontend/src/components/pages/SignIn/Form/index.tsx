import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

import useSession from "@/hooks/useSession";
import useTheme from "@/hooks/useTheme";

import styles from "./form.module.scss";

export default function SignInForm() {
  const [isBusy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const { signIn } = useSession();
  const { theme } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isBusy) {
      return;
    }

    setBusy(true);

    const formData = new FormData(e.currentTarget);
    const user = formData.get("user")?.toString();
    const password = formData.get("password")?.toString();

    const status = user && password ? await signIn({ user, password }) : 401;

    if (status === 200) {
      router.push("/");
      setError("");
    } else {
      if (status === 401) {
        setError("Usuário ou senha incorretos.");
      } else {
        setError("Erro desconhecido. Tente novamente.");
      }
      setBusy(false);
    }
  };

  const common = { required: true, fullWidth: true, margin: "none" } as TextFieldProps;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>

      <TextField className={error ? styles.invalid : ""} name="user" label="Usuário" {...common} />
      <TextField
        className={error ? styles.invalid : ""}
        type="password"
        name="password"
        label="Senha"
        {...common}
      />

      {error && (
        <Alert variant={theme === "dark" ? "filled" : "standard"} severity="error">
          {error}
        </Alert>
      )}

      <Button variant="contained" type="submit" size="large" disabled={isBusy}>
        {isBusy ? "Fazendo Login..." : "Login"}
      </Button>
    </form>
  );
}
