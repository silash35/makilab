import Head from "next/head";

import SignIn from "@/components/pages/signin";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Faça Login</title>
      </Head>
      <SignIn />
    </>
  );
}

SignInPage.Layout = function Layout({ children }: { children: React.ReactNode }) {
  return children;
};
