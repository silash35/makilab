import type { Request } from "express";

import { validateID } from "../shared/validation";
import processClient from "./processor";
import clientService from "./service";
import { validateClient, validateQuery } from "./validation";

const getAll = async (query: Request["query"]) => {
  return processClient(await clientService.getAll(validateQuery(query)));
};

const create = async (client: unknown, ServiceOrder?: unknown) => {
  return processClient(await clientService.create(validateClient(client, ServiceOrder)));
};

const update = async (id: unknown, client: unknown, serviceOrder?: unknown) => {
  return processClient(
    await clientService.update(validateID(id), validateClient(client, serviceOrder)),
  );
};

const deleteOne = async (id: unknown) => {
  await clientService.deleteOne(validateID(id));
  return { deletedID: id };
};

export { create, deleteOne, getAll, update };
