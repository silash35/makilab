import { filterNumber } from "@/utils/filters";

const MAX_32_INTEGER = 2147483647;

const validateID = (id: unknown) => {
  const intId = filterNumber(id);
  if (!intId) {
    throw new Error("Invalid data: id");
  }

  if (intId > MAX_32_INTEGER) {
    throw new Error("Invalid data: id");
  }

  return intId;
};

export { validateID };
