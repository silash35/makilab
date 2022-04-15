import SignInForm from "@/components/signin/Form";

import styles from "./signin.module.scss";

export default function SignIn() {
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
