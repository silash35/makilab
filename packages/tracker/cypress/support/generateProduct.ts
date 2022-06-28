import { faker } from "@faker-js/faker/locale/pt_BR";

export default function generateProduct() {
  return {
    id: faker.datatype.number(10000),

    name: `${faker.vehicle.vehicle()} ${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
    isUnderWarranty: faker.datatype.boolean(),
    isBudgetApproved: null,

    createdAt: faker.datatype.datetime().toISOString(),
    budgetedAt: null,
    budgetAnsweredAt: null,
    repairedAt: null,
    deliveredToCustomerAt: null,
  };
}
