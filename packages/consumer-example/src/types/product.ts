interface Product {
  id: number;

  name: string;
  isUnderWarranty: boolean;
  isBudgetApproved: boolean;

  createdAt: string;
  evaluatedAt: string;
  budgetAnsweredAt: string;
  repairedAt: string;
  deliveredToCustomerAt: string;
}

export default Product;
