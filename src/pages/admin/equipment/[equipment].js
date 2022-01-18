import { withPasswordProtect } from "@storyofams/next-password-protect";
import Head from "next/head";
import { useState } from "react";

import Header from "@/components/common/header";

function Equipment() {
  const [isPrinting, setIsPrinting] = useState(false);

  const print = () => {
    setIsPrinting(true);

    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return isPrinting ? (
    <div>Imprimindo</div>
  ) : (
    <>
      <Head>
        <title>Gerenciar Ordens de Serviço</title>
      </Head>

      <Header />

      <main style={{ display: "flex" }}>
        <button onClick={print}>Print</button>
      </main>
    </>
  );
}

export default withPasswordProtect(Equipment, {
  loginComponentProps: {
    backUrl: "/",
    logo: "/logo.png",
    buttonColor: "#fff",
    buttonBackgroundColor: "#c00000",
  },
});
