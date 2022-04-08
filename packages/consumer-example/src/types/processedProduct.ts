import Product from "@/types/product";

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

export default ProcessedProduct;
