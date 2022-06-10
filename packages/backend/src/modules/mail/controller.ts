import mailService from "./service";
import { validateAttachment, validateString } from "./validation";

const sendMail = async (to: unknown, text: unknown, file: Express.Multer.File | undefined) => {
  const testMessageUrl = await mailService.sendMail(
    validateString(to, "e-mail address"),
    validateString(text),
    validateAttachment(file)
  );

  return { status: "success", testMessageUrl };
};

export { sendMail };
