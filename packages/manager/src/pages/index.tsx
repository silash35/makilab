import Head from "next/head";

import AdminMenu from "@/components/adminMenu";
import protect from "@/utils/protect";

function Home() {
  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>

      <AdminMenu />
    </>
  );
}

export default protect(Home);
