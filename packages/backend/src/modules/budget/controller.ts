import { validateID } from "../shared/validation";
import processBudget from "./processor";
import budgetService from "./service";
import { validateBudget } from "./validation";

const getAll = async (serviceOrderId: unknown) => {
  return processBudget(await budgetService.getAll(validateID(serviceOrderId)));
};

const getOne = async (id: unknown) => {
  return processBudget(await budgetService.getOne(validateID(id)));
};

const create = async (serviceOrderId: unknown, budget: unknown) => {
  return processBudget(
    await budgetService.create(validateID(serviceOrderId), validateBudget(budget)),
  );
};

const update = async (id: unknown, budget: unknown) => {
  return processBudget(await budgetService.update(validateID(id), validateBudget(budget)));
};

const deleteOne = async (id: unknown) => {
  await budgetService.deleteOne(validateID(id));
  return { deletedID: id };
};

export { create, deleteOne, getAll, getOne, update };
