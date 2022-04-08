import ProcessedProduct from "@/types/processedProduct";
import Product from "@/types/product";

export default function processProduct(product: Product) {
  const processedProduct: any = product;

  if (typeof product === "object" && product != null) {
    processedProduct.isFinished = false;
    if (product.deliveredToCustomerAt != null) {
      processedProduct.stepText = "Seu produto foi finalizado e já foi retirado";
      processedProduct.isFinished = true;
      if (product.isUnderWarranty) {
        processedProduct.activeStep = 4;
      } else {
        processedProduct.activeStep = 5;
      }
    } else if (product.repairedAt != null) {
      processedProduct.stepText =
        "Seu produto já está pronto para retirada. Necessário trazer comprovante da Ordem de Serviço";
      if (product.isUnderWarranty) {
        processedProduct.activeStep = 2;
      } else {
        processedProduct.activeStep = 3;
      }
    } else if (product.budgetAnsweredAt != null) {
      if (product.isBudgetApproved) {
        processedProduct.activeStep = 2;
        processedProduct.stepText =
          "O orçamento foi aprovado, e agora o produto está aguardando a chegada das peças para fazer o reparo";
      } else {
        processedProduct.activeStep = 1;
        processedProduct.stepText =
          "O orçamento reprovado, aguarde contato para retirada do produto";
      }
    } else if (product.evaluatedAt) {
      processedProduct.activeStep = 1;

      if (product.isUnderWarranty) {
        processedProduct.stepText =
          "Seu produto já foi avaliado e está aguardando a chegada das peças para fazer o reparo";
      } else {
        processedProduct.stepText =
          "Seu produto foi avaliado e está aguardando a aprovação do orçamento. Confira seu Whatsapp!";
      }
    } else {
      processedProduct.activeStep = 0;
      processedProduct.stepText =
        "Recebemos seu produto para avaliação técnica. Aguarde nosso contato pelo Whatsapp ou Email";
    }

    // Get Steps
    const steps = [];

    steps.push({
      label: "Em Avaliação",
    });

    if (!product.isUnderWarranty) {
      steps.push({
        label: "Aguardando aprovação do orçamento",
        error: product.isBudgetApproved === false && processedProduct.activeStep < 2,
      });
    }

    steps.push({
      label: "Aguardando peça",
    });

    steps.push({
      label: "Disponível para retirada",
    });

    steps.push({
      label: "Finalizado",
    });

    processedProduct.steps = steps;
  }

  return processedProduct as ProcessedProduct;
}
