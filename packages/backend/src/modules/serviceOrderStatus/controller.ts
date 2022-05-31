import serviceOrderService from "../serviceOrder/service";
import { validateID } from "../shared/validation";
import { validateStatusSO } from "./validation";

const update = async (id: unknown, serviceOrder: unknown) => {
  return await serviceOrderService.update(validateID(id), validateStatusSO(serviceOrder));
};

export { update };
