import { validateID } from "../shared/validation";
import processBudget from "./processor";
import budgetService from "./service";

const getAll = async (serviceOrderID: unknown) => {
  return processBudget(await budgetService.getAll(validateID(serviceOrderID)));
};

const getOne = async (id: unknown) => {
  return processBudget(await budgetService.getOne(validateID(id)));
};

const deleteOne = async (id: unknown) => {
  await budgetService.deleteOne(validateID(id));
  return { deletedID: id };
};

export { getAll, getOne, deleteOne };
