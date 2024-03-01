import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import useSession from "@/hooks/useSession";
import useTheme from "@/hooks/useTheme";

import styles from "./form.module.scss";

const SignInForm = () => {
  const [isBusy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const { signIn } = useSession();
  const { theme } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isBusy) return;

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

      <TextField className={error ? styles.invalid : ""} label="Usuário" name="user" {...common} />
      <TextField
        className={error ? styles.invalid : ""}
        label="Senha"
        name="password"
        type="password"
        {...common}
      />

      {error && (
        <Alert severity="error" variant={theme === "dark" ? "filled" : "standard"}>
          {error}
        </Alert>
      )}

      <Button disabled={isBusy} size="large" type="submit" variant="contained">
        {isBusy ? "Fazendo Login..." : "Login"}
      </Button>
    </form>
  );
};

export default SignInForm;
