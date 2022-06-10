import Header from "@/components/common/Header";
import Info from "@/components/common/Info";

import Track from "./Track";

export default function Index() {
  return (
    <>
      <Header />

      <main style={{ display: "contents" }}>
        <Track />
        <Info />
      </main>
    </>
  );
}
