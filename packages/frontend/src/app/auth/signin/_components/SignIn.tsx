"use client";

import Card from "@mui/material/Card";
import { useRouter } from "next/navigation";

import useSession from "@/hooks/useSession";

import SignInForm from "./Form";
import styles from "./signin.module.scss";

const SignIn = () => {
  const { session } = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router.push("/");
  }

  return (
    <main className={styles.main}>
      <div className={styles.signin}>
        <img alt="Logo" height="auto" src={"/icon.svg"} width="130" />

        <Card elevation={4}>
          <SignInForm />
        </Card>
      </div>
    </main>
  );
};

export default SignIn;
