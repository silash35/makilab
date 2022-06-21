import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

import useSession from "@/hooks/useSession";

import styles from "./form.module.scss";

export default function SignInForm() {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const [isBusy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const { signIn } = useSession();

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isBusy) {
      return;
    }
    setBusy(true);
    setError("");

    const status = await signIn({ user, password });

    if (status === 200) {
      router.push("/");
      setError("");
    } else {
      if (status === 401) {
        setError("Usuário ou senha incorretos.");
      } else {
        setError("Erro desconhecido. Tente novamente.");
      }
    }

    setBusy(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        Usuário
        <input
          className={error ? styles.invalid : ""}
          type="text"
          placeholder="Digite seu nome de usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          data-testid="user-input"
          required
        />
      </label>
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
      {error && <div className={styles.error}>{error}</div>}

      <button type="submit" disabled={isBusy} className={styles.button}>
        {isBusy ? "Fazendo Login..." : "Login"}
      </button>
    </form>
  );
}
