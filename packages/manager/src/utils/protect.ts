import { withPasswordProtect } from "@storyofams/next-password-protect";

export default function protect(page: () => JSX.Element) {
  return withPasswordProtect(page, {
    loginComponentProps: {
      backUrl: "/",
      logo: "/icon.svg",
      buttonColor: "#fff",
      buttonBackgroundColor: "#2ec27e",
    },
  });
}
