import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

import useSession from "@/hooks/useSession";

import styles from "./layout.module.scss";
import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { session } = useSession();

  if (session.status === "loading") {
    return (
      <Stack alignItems="center" height="100%" justifyContent="center">
        <CircularProgress />
      </Stack>
    );
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
};

export default Layout;
