import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useMediaQuery } from "react-responsive";

import styles from "./product.module.scss";

export default function Product({ product }) {
  const isMobile = useMediaQuery({ query: `(max-width: 1100px)` });

  if (product === false) {
    return null;
  }

  if (!product.name) {
    return <p>Nenhum produto encontrado, você digitou a OS corretamente?</p>;
  }

  const steps = getSteps(product);

  return (
    <section className={styles.product}>
      <p>{product.name}</p>

      <Stepper
        activeStep={getActiveStep(product)}
        orientation={isMobile ? "vertical" : "horizontal"}
      >
        {steps.map((step) => {
          const labelProps = {};

          labelProps.error = step.error;

          return (
            <Step key={step.label}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </section>
  );
}

const getSteps = (product) => {
  const steps = [];

  steps.push({
    label: "Em Avaliação",
  });

  if (!product.isUnderWarranty) {
    steps.push({
      label: "Aguardando aprovação do orçamento",
      error: product.isBudgetApproved === false,
    });
  }

  steps.push({
    label: "Aguardando peça",
  });

  steps.push({
    label: "Disponivel para retirada",
  });

  steps.push({
    label: "Finalizado",
  });

  return steps;
};

const a = {
  avalietedAt: null,
  budgetApprovedAt: null,
  createdAt: "2021-11-20T09:42:05.956Z",
  deliveredToCustomerAt: null,
  isBudgetApproved: null,
  isUnderWarranty: false,
  name: "Batedeira",
  repairedAt: null,
};

a;

const getActiveStep = (product) => {
  if (product.isUnderWarranty) {
    if (product.deliveredToCustomerAt != null) {
      return 3;
    }
    if (product.repairedAt != null) {
      return 2;
    }
  } else {
    if (product.deliveredToCustomerAt != null) {
      return 4;
    }
    if (product.repairedAt != null) {
      return 3;
    }
    if (product.budgetApprovedAt != null) {
      return 2;
    }
  }

  if (product.avalietedAt != null) {
    return 1;
  }

  return 0;
};
