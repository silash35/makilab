interface PublicSO {
  id: number;
  name: string;
  isUnderWarranty: boolean;
  isBudgetApproved: boolean | null;
  createdAt: Date;
  budgetedAt: Date | null;
  budgetAnsweredAt: Date | null;
  repairedAt: Date | null;
  deliveredToCustomerAt: Date | null;
}

export default PublicSO;
