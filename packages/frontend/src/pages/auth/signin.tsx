import Head from "next/head";

import SignIn from "@/components/pages/SignIn";

const SignInPage = () => (
  <>
    <Head>
      <title>Faça Login</title>
    </Head>
    <SignIn />
  </>
);

export default SignInPage;

SignInPage.Layout = ({ children }: { children: React.ReactNode }) => children;
