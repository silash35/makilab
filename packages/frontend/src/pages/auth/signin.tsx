import Head from "next/head";

import SignIn from "@/components/pages/SignIn";

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Faça Login</title>
      </Head>
      <SignIn />
    </>
  );
};

export default SignInPage;

SignInPage.Layout = function Layout({ children }: { children: React.ReactNode }) {
  return children;
};
