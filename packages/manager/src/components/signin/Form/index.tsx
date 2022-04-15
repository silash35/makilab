import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

import styles from "./form.module.scss";

interface signInResponse {
  error: string | undefined;
  status: number;
  ok: boolean;
  url: string | null;
}

export default function SignInForm() {
  const [password, setPassword] = useState("");
  const [isBusy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isBusy) {
      return;
    }
    setBusy(true);
    setError("");

    const res = (await signIn("credentials", {
      redirect: false,
      password,
      callbackUrl: `${window.location.origin}`,
    })) as signInResponse | undefined;

    if (res) {
      if (res.url && res.ok) {
        router.push(res.url);
        setError("");
      } else {
        if (res.status === 401) {
          setError("Senha incorreta. Tente novamente.");
        } else {
          setError("Erro desconhecido. Tente novamente.");
        }
        console.log(res.error);
      }
    } else {
      setError("Erro desconhecido. Tente novamente.");
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
