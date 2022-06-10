import config from "@config";

import en from "./locales/getProduct/en";
import pt from "./locales/getProduct/pt";

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

async function getProduct(search: string, locale?: string) {
  let res;

  try {
    res = await fetch(config.API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search }),
    });
  } catch (e) {
    return "Unknown error";
  }

  if (res.status === 404) {
    return "Not found";
  }

  if (res.status !== 200) {
    return "Unknown error";
  }

  const product: Product = await res.json();
  return processProduct(product, locale);
}

export type { ProcessedProduct as Product };
export default getProduct;
