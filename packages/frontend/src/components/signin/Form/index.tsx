import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useContext } from "react";

import { AuthContext } from "@/contexts/AuthContext";

import styles from "./form.module.scss";

export default function SignInForm() {
  const [password, setPassword] = useState("");
  const [isBusy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const { signIn } = useContext(AuthContext);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isBusy) {
      return;
    }
    setBusy(true);
    setError("");

    const status = await signIn({ password });

    if (status === 200) {
      router.push("/");
      setError("");
    } else {
      if (status === 401) {
        setError("Senha incorreta. Tente novamente.");
      } else {
        setError("Erro desconhecido. Tente novamente.");
      }
    }

    setBusy(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        Senha
        <input
          className={error ? styles.invalid : ""}
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password-input"
          required
        />
      </label>
      {!!error && <div className={styles.error}>{error}</div>}

      <button type="submit" disabled={isBusy} className={styles.button}>
        {isBusy ? "Fazendo Login..." : "Login"}
      </button>
    </form>
  );
}
