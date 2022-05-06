interface TServiceOrder {
  id: number;

  equipment: string | null;
  brand: string | null;
  model: string | null;
  productNumber: string | null;
  batchOrImei: string | null;
  problemDescription: string | null;
  productCondition: string | null;
  accessories: string | null;
  listOfServices: null;
  notes: string | null;

  isUnderWarranty: boolean;
  attendedBy: string;
  attendedOn: string;

  ownerId: number;

  wasEdited: boolean;
  deleted: boolean;
  isBudgetApproved: boolean | null;

  createdAt: string;
  registeredInManufacturerAt: string | null;
  budgetedAt: string | null;
  budgetAnsweredAt: string | null;
  partsArrivedAt: string | null;
  repairedAt: string | null;
  deliveredToCustomerAt: string | null;

  statusNumber: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70;
  defaultEmail?: string;
  statusName: string;
  isUrgent: boolean;
}

interface TServiceOrderInput {
  equipment: string;
  brand?: string;
  model?: string;
  productNumber?: string;
  batchOrImei?: string;
  problemDescription?: string;
  productCondition?: string;
  accessories?: string;
  listOfServices?: string;
  notes?: string;

  isUnderWarranty: boolean;
  attendedBy: string;
  attendedOn: string;
}

interface TServiceOrderUpdateStatusInput {
  createdAt: string;
  registeredInManufacturerAt?: string;
  budgetedAt?: string;
  budgetAnsweredAt?: string;
  partsArrivedAt?: string;
  repairedAt?: string;
  deliveredToCustomerAt?: string;

  isBudgetApproved?: boolean;
}

export type { TServiceOrder, TServiceOrderInput, TServiceOrderUpdateStatusInput };
export default TServiceOrder;
