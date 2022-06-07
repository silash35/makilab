import { filterString } from "@/utils/filters";

const validateString = (variable: unknown, error = "string") => {
  const string = filterString(variable);
  if (!string) {
    throw new Error("Invalid data: " + error);
  }

  return string;
};

const validateAttachment = (file: Express.Multer.File | undefined) => {
  if (file) {
    return [
      {
        filename: file.originalname,
        content: file.buffer,
      },
    ];
  }

  return undefined;
};
export { validateAttachment, validateString };
