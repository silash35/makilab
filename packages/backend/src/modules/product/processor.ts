import { ServiceOrder } from "@prisma/client";

const productProcessor = (serviceOrder: ServiceOrder) => {
  const parsedServiceOrder = {
    ...serviceOrder,
    name: `${serviceOrder.equipment}${serviceOrder.brand ? " " + serviceOrder.brand : ""}${
      serviceOrder.model ? " " + serviceOrder.model : ""
    }`,
  };

  return parsedServiceOrder;
};

export default productProcessor;
