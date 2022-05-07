import { setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

import request from "@/utils/request";

interface Session {
  user: {
    id: number;
    name: string;
    accessTypes: string[];
  } | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

interface SignInData {
  password: string;
}

interface AuthContextType {
  session: Session;
  signIn: (data: SignInData) => Promise<number | undefined>;
}

const loadingSession: Session = { user: null, status: "loading" };
const unauthenticatedSession: Session = { user: null, status: "unauthenticated" };

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>(loadingSession);

  useEffect(() => {
    setSession(loadingSession);
    loadUser();
  }, []);

  async function loadUser() {
    const { response, status } = await request({
      method: "GET",
      url: "/api/auth/user",
    });

    if (status === 200) {
      setSession({ user: response, status: "authenticated" });
    } else {
      setSession(unauthenticatedSession);
    }
  }

  async function signIn({ password }: SignInData) {
    const { response, status } = await request({
      method: "POST",
      url: "/api/auth/signin",
      body: { password },
    });

    if (status === 200) {
      const { token, user } = response;

      setCookie(undefined, "token", token, {
        maxAge: 86400 * 7, // expires in 7 days
      });

      setSession({ user, status: "authenticated" });
    }

    return status;
  }

  return <AuthContext.Provider value={{ session, signIn }}>{children}</AuthContext.Provider>;
}
