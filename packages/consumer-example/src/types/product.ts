interface Product {
  id: number;

  name: string;
  isUnderWarranty: boolean;
  isBudgetApproved: boolean;

  createdAt: string;
  budgetedAt: string;
  budgetAnsweredAt: string;
  repairedAt: string;
  deliveredToCustomerAt: string;
}

export default Product;
