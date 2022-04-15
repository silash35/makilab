import Head from "next/head";

import AdminMenu from "@/components/adminMenu";

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

export default Home;
