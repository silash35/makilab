import contract from "@opensom/contract";
import type { ClientInferResponseBody } from "@ts-rest/core";

import en from "./locale/en";
import pt from "./locale/pt";

type Product = ClientInferResponseBody<typeof contract.product.get, 200>;

interface Step {
  label: string;
  error?: boolean;
}

interface ProcessedProduct extends Product {
  isFinished: boolean;
  stepText: string;
  activeStep: number;

  steps: Step[];
}

function processProduct(product: Product, locale?: string) {
  const t = locale === "en" ? en : pt;

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
  const steps: Step[] = [{ label: t.stepLabel0 }];
  if (!product.isUnderWarranty) {
    steps.push({
      label: t.stepLabel1,
      error: product.isBudgetApproved === false && activeStep < 2,
    });
  }
  steps.push({ label: t.stepLabel2 }, { label: t.stepLabel3 }, { label: t.stepLabel4 });

  const processedProduct: ProcessedProduct = {
    ...product,
    isFinished,
    activeStep,
    stepText,
    steps,
  };

  return processedProduct;
}

export type { ProcessedProduct };
export default processProduct;
