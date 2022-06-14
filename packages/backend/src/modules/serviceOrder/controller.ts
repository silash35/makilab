import type { Request } from "express";

import { validateID } from "../shared/validation";
import processSO from "./processor";
import serviceOrderService from "./service";
import { validateQuery, validateSO, validateStatusSO } from "./validation";

const getAll = async (query: Request["query"]) => {
  return processSO(await serviceOrderService.getAll(validateQuery(query)));
};

const getOne = async (id: unknown) => {
  const serviceOrder = await serviceOrderService.getOne(validateID(id));

  if (!serviceOrder) {
    throw new Error("Not Found");
  }

  return processSO(serviceOrder);
};

const update = async (id: unknown, serviceOrder: unknown) => {
  return processSO(await serviceOrderService.update(validateID(id), validateSO(serviceOrder)));
};

const updateStatus = async (id: unknown, serviceOrder: unknown) => {
  return await serviceOrderService.update(validateID(id), validateStatusSO(serviceOrder));
};

const deleteOne = async (id: unknown) => {
  await serviceOrderService.deleteOne(validateID(id));
  return { deletedID: id };
};

export { deleteOne, getAll, getOne, update, updateStatus };
