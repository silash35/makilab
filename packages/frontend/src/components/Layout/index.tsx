import { useRouter } from "next/router";

import useSession from "@/hooks/useSession";

import styles from "./layout.module.scss";
import Sidebar from "./sidebar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { session } = useSession();

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
