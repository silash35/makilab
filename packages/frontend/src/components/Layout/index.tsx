import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import styles from "./layout.module.scss";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { session } = useContext(AuthContext);

  if (session.status === "loading") {
    return null;
  }

  if (session.status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
