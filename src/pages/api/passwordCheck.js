import { passwordCheckHandler } from "@storyofams/next-password-protect";

export default passwordCheckHandler(process.env.PASSWORD, {
  cookieName: process.env.COOKIE_NAME,
});
