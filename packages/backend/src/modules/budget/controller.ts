import { validateID } from "../shared/validation";
import processBudget from "./processor";
import budgetService from "./service";

const getAll = async (serviceOrderId: unknown) => {
  return processBudget(await budgetService.getAll(validateID(serviceOrderId)));
};

const getOne = async (id: unknown) => {
  return processBudget(await budgetService.getOne(validateID(id)));
};

const deleteOne = async (id: unknown) => {
  await budgetService.deleteOne(validateID(id));
  return { deletedID: id };
};

export { deleteOne, getAll, getOne };
