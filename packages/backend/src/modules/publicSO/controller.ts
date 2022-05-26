import { validateID } from "../shared/validation";
import processPublicSO from "./processor";
import publicSOService from "./service";

const getOne = async (id: unknown) => {
  const serviceOrder = await publicSOService.getOne(validateID(id));

  if (!serviceOrder) {
    throw new Error("Not Found");
  }

  return processPublicSO(serviceOrder);
};

export { getOne };
