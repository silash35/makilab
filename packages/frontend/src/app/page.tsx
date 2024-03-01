import { redirect } from "next/navigation";

const RootPage = () => {
  redirect("/admin");
  return null;
};

export default RootPage;
