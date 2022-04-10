export default function processProduct(product) {
  if (typeof product === "object" && product != null) {
    product.isFinished = false;
    if (product.deliveredToCustomerAt != null) {
      product.stepText = "Seu produto foi finalizado e já foi retirado";
      product.isFinished = true;
      if (product.isUnderWarranty) {
        product.activeStep = 4;
      } else {
        product.activeStep = 5;
      }
    } else if (product.repairedAt != null) {
      product.stepText =
        "Seu produto já está pronto para retirada. Nescessario trazer comprovante da Ordem de Serviço";
      if (product.isUnderWarranty) {
        product.activeStep = 2;
      } else {
        product.activeStep = 3;
      }
    } else if (product.budgetAnsweredAt != null) {
      if (product.isBudgetApproved) {
        product.activeStep = 2;
        product.stepText =
          "O orçamento foi aprovado, e agora o produto está aguardando a chegada das peças para fazer o reparo";
      } else {
        product.activeStep = 1;
        product.stepText = "O orçamento reprovado, aguarde contato para retirada do produto";
      }
    } else if (product.evaluatedAt) {
      product.activeStep = 1;

      if (product.isUnderWarranty) {
        product.stepText =
          "Seu produto já foi avaliado e está aguardando a chegada das peças para fazer o reparo";
      } else {
        product.stepText =
          "Seu produto foi avaliado e está aguardando a aprovação do orçamento. Confira seu Whatsapp!";
      }
    } else {
      product.activeStep = 0;
      product.stepText =
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
        error: product.isBudgetApproved === false && product.activeStep < 2,
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

    product.steps = steps;
  }

  return product;
}
