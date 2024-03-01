import type { Metadata } from "next";

import SignIn from "@/components/pages/SignIn";

export const metadata: Metadata = { title: "Faça Login" };

const SignInPage = () => <SignIn />;

export default SignInPage;
