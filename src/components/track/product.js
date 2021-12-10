import { blue, green } from "@mui/material/colors";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMediaQuery } from "react-responsive";

import Dates from "./dates";
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
  const activeStep = getActiveStep(product);
  const isFinished = getIsFinished(activeStep, product.isUnderWarranty);
  const text = getStepText(activeStep, product.isUnderWarranty, product.isBudgetApproved);

  const theme = createTheme({
    palette: {
      primary: isFinished ? green : blue,
    },
  });

  return (
    <section className={styles.product}>
      <h2>{product.name}</h2>

      <ThemeProvider theme={theme}>
        <Stepper
          activeStep={isFinished ? activeStep + 1 : activeStep}
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
      </ThemeProvider>

      <p>{text}</p>

      <Dates product={product} />
    </section>
  );
}

const getIsFinished = (activeStep, isUnderWarranty) => {
  if (isUnderWarranty && activeStep === 3) {
    return true;
  } else if (activeStep === 4) {
    return true;
  }

  return false;
};

const getSteps = (product) => {
  const steps = [];

  steps.push({
    label: "Em Avaliação",
  });

  if (!product.isUnderWarranty) {
    steps.push({
      label: "Aguardando aprovação do orçamento",
      error: product.isBudgetApproved === false && getActiveStep(product) < 2,
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
    if (product.budgetAnsweredAt != null) {
      return 2;
    }
  }

  if (product.avalietedAt != null) {
    return 1;
  }

  return 0;
};

const getStepText = (activeStep, isUnderWarranty, isBudgetApproved) => {
  let text;

  if (isUnderWarranty && activeStep > 1) {
    activeStep++;
  }

  switch (activeStep) {
    case 0:
      text = "Seu produto está passando pela avaliação tecnica. Aguarde de 3 a 5 dias";
      break;
    case 1:
      text =
        "Seu produto foi avaliado e está aguardando a aprovação do orçamento. Confira seu Whatsapp!";
      break;
    case 2:
      text =
        "Seu produto já foi avaliado e está aguardando a chegada das peças para fazer o reparo";
      break;
    case 3:
      text =
        "Seu produto já está pronto para retirada. Venha busca-lo e não se esqueça de trazer o papel da Ordem de Serviço";
      break;
    case 4:
      text = "Seu produto foi finalizado e já foi retirado";
      break;
  }

  if (isBudgetApproved === false && activeStep === 1) {
    text = "O orçamento não foi aprovado";
  }

  return text;
};
