import { validateID } from "../shared/validation";
import budgetItemService from "./service";
import { validateItem } from "./validation";

const create = async (budgetId: unknown, budgetItem: unknown) => {
  return await budgetItemService.create(validateID(budgetId), validateItem(budgetItem));
};

const update = async (id: unknown, budgetItem: unknown) => {
  return await budgetItemService.update(validateID(id), validateItem(budgetItem));
};

const deleteOne = async (id: unknown) => {
  await budgetItemService.deleteOne(validateID(id));
  return { deletedID: id };
};

export { create, update, deleteOne };
