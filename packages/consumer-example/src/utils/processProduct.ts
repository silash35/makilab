import ProcessedProduct, { Step } from "@/types/processedProduct";
import Product from "@/types/product";

interface T {
  stepText0: string;
  stepText1v1: string;
  stepText1v2: string;
  stepText2v1: string;
  stepText2v2: string;
  stepText3: string;
  stepText4: string;

  stepLabel0: string;
  stepLabel1: string;
  stepLabel2: string;
  stepLabel3: string;
  stepLabel4: string;
}

export default function processProduct(product: Product, t: T) {
  let isFinished = false;
  let activeStep = 0;
  let stepText = t.stepText0;

  if (product.deliveredToCustomerAt != null) {
    stepText = t.stepText4;
    isFinished = true;
    activeStep = product.isUnderWarranty ? 4 : 5;
  } else if (product.repairedAt != null) {
    stepText = t.stepText3;
    activeStep = product.isUnderWarranty ? 2 : 3;
  } else if (product.budgetAnsweredAt != null) {
    if (product.isBudgetApproved) {
      activeStep = 2;
      stepText = t.stepText2v1;
    } else {
      activeStep = 1;
      stepText = t.stepText2v2;
    }
  } else if (product.budgetedAt) {
    activeStep = 1;

    if (product.isUnderWarranty) {
      stepText = t.stepText1v1;
    } else {
      stepText = t.stepText1v2;
    }
  }

  // Get Steps
  const steps: Step[] = [];

  steps.push({
    label: t.stepLabel0,
  });

  if (!product.isUnderWarranty) {
    steps.push({
      label: t.stepLabel1,
      error: product.isBudgetApproved === false && activeStep < 2,
    });
  }

  steps.push({
    label: t.stepLabel2,
  });

  steps.push({
    label: t.stepLabel3,
  });

  steps.push({
    label: t.stepLabel4,
  });

  const processedProduct: ProcessedProduct = {
    ...product,

    isFinished,
    activeStep,
    stepText,
    steps,
  };

  return processedProduct;
}
