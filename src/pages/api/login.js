import { loginHandler } from "@storyofams/next-password-protect";

export default loginHandler(process.env.PASSWORD, {
  cookieName: process.env.COOKIE_NAME,
});
