import { useRouter } from "next/router";

import SignInForm from "@/components/signin/Form";
import useSession from "@/hooks/useSession";

import styles from "./signin.module.scss";

export default function SignIn() {
  const { session } = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router.push("/");
  }

  return (
    <main className={styles.main}>
      <div className={styles.signin}>
        <img width="130" height="auto" src={"/icon.svg"} alt="Logo" />

        <div className={styles.formContainer} id="password-form">
          <h1>Login</h1>
          <SignInForm />
        </div>
      </div>
    </main>
  );
}
