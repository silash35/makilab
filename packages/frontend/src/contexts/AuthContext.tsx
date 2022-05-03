import config from "@config";
import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

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
  signIn: (data: SignInData) => Promise<number>;
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
    const { token: token } = parseCookies();

    if (token) {
      const res = await fetch(`${config.BACKEND_URL}/api/auth/user`, {
        method: "GET",
        headers: { authorization: token, "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        setSession({ user: await res.json(), status: "authenticated" });
      } else {
        setSession(unauthenticatedSession);
      }
    } else {
      setSession(unauthenticatedSession);
    }
  }

  async function signIn({ password }: SignInData) {
    const res = await fetch(`${config.BACKEND_URL}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.status === 200) {
      const { token, user } = await res.json();

      setCookie(undefined, "token", token, {
        maxAge: 86400 * 7, // expires in 7 days
      });

      setSession({ user, status: "authenticated" });
    }

    return res.status;
  }

  return <AuthContext.Provider value={{ session, signIn }}>{children}</AuthContext.Provider>;
}
