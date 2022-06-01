import { filterString } from "@/utils/filters";

const validateString = (variable: unknown, error = "string") => {
  const string = filterString(variable);
  if (!string) {
    throw new Error("Invalid data: " + error);
  }

  return string;
};

export { validateString };
