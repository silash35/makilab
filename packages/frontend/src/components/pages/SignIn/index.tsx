import Card from "@mui/material/Card";
import { useRouter } from "next/router";

import SignInForm from "@/components/pages/SignIn/Form";
import useSession from "@/hooks/useSession";

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
