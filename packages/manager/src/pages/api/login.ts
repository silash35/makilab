import { loginHandler } from "@storyofams/next-password-protect";

if (!process.env.PASSWORD) {
  throw new Error("PASSWORD is not defined");
}

export default loginHandler(process.env.PASSWORD, {
  cookieName: process.env.COOKIE_NAME,
});
