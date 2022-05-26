import { filterNumber } from "../../utils/filters";

const validateID = (id: unknown) => {
  const intId = filterNumber(id);
  if (!intId) {
    throw new Error("Invalid data: id");
  }

  return intId;
};

export { validateID };
