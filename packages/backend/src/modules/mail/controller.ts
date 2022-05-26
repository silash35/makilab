import mailService from "./service";
import { validateString } from "./validation";

const sendMail = async (to: unknown, text: unknown) => {
  const testMessageUrl = await mailService.sendMail(
    validateString(to, "e-mail address"),
    validateString(text)
  );

  return { status: "success", testMessageUrl };
};

export { sendMail };
