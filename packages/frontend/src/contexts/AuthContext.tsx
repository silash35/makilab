import { destroyCookie, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

import request from "@/utils/request";

interface Session {
  user: {
    id: number;
    name: string;
    permissions: string[];
  } | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

interface SignInData {
  user: string;
  password: string;
}

interface AuthContextType {
  session: Session;
  signIn: (data: SignInData) => Promise<number | undefined>;
  signOut: () => void;
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
    const { response, error, status } = await request({
      method: "GET",
      url: "/api/auth/user",
    });

    if (!error && status === 200 && response.name !== "anonymous") {
      setSession({ user: response, status: "authenticated" });
    } else {
      setSession(unauthenticatedSession);
    }
  }

  async function signIn({ user, password }: SignInData) {
    const { response, status, error } = await request({
      method: "POST",
      url: "/api/auth/signin",
      body: { user, password },
    });

    if (!error) {
      const { token, user } = response;

      setCookie(undefined, "token", token, {
        maxAge: 86400 * 7, // expires in 7 days
      });

      setSession({ user, status: "authenticated" });
    }

    return status;
  }

  async function signOut() {
    destroyCookie(undefined, "token");
    location.reload();
  }

  return (
    <AuthContext.Provider value={{ session, signIn, signOut }}>{children}</AuthContext.Provider>
  );
}
