import { withPasswordProtect } from "@storyofams/next-password-protect";

function Admin() {
  return <p>Olá vc está logado e numa pagina secreta</p>;
}

export default withPasswordProtect(Admin, {
  loginComponentProps: {
    backUrl: "/",
    logo: "/logo.png",
    buttonColor: "#fff",
    buttonBackgroundColor: "#c00000",
  },
});
