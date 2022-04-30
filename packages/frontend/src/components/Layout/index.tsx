import { signIn, useSession } from "next-auth/react";

import styles from "./layout.module.scss";
import Sidebar from "./sidebar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const data = useSession();

  if (data.status === "loading") {
    return null;
  }

  if (data.status === "unauthenticated") {
    signIn();
    return null;
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
