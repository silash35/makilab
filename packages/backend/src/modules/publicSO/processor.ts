import { ServiceOrder } from "@prisma/client";

const processPublicSO = (serviceOrder: ServiceOrder) => {
  const parsedServiceOrder = {
    id: serviceOrder.id,
    name: `${serviceOrder.equipment}${serviceOrder.brand ? " " + serviceOrder.brand : ""}${
      serviceOrder.model ? " " + serviceOrder.model : ""
    }`,
    isUnderWarranty: serviceOrder.isUnderWarranty,
    isBudgetApproved: serviceOrder.isBudgetApproved,

    createdAt: serviceOrder.createdAt,
    budgetedAt: serviceOrder.budgetedAt,
    budgetAnsweredAt: serviceOrder.budgetAnsweredAt,
    repairedAt: serviceOrder.repairedAt,
    deliveredToCustomerAt: serviceOrder.deliveredToCustomerAt,
  };
  return parsedServiceOrder;
};

export default processPublicSO;
