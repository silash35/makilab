import type { Metadata } from "next";

import SignIn from "./_components/SignIn";

export const metadata: Metadata = { title: "Faça Login" };

const SignInPage = () => <SignIn />;

export default SignInPage;
