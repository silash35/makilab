import CircularProgress from "@mui/material/CircularProgress";
import { blue, green } from "@mui/material/colors";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

import Dates from "./dates";
import styles from "./product.module.scss";

export default function Product({ product }) {
  const isMobile = useMediaQuery({ query: `(max-width: 1100px)` });

  if (product === false) {
    return null;
  }

  if (product === "loading") {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
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

      <div className={styles.flex}>
        <div>
          <p>{text}</p>
          <Dates product={product} />
        </div>

        <Link
          as="https://api.whatsapp.com/send?phone=5571985447786"
          href="https://api.whatsapp.com/send?phone=5571985447786"
        >
          <a>
            <img alt="Ícone do MakiLab; O desenho de uma Coruja" src="/WhatsApp.png" height="100" />
          </a>
        </Link>
      </div>
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
    label: "Disponível para retirada",
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
      if (product.isBudgetApproved) {
        return 2;
      } else {
        return 1;
      }
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
      text =
        "Recebemos seu produto para avaliação técnica. Aguarde nosso contato pelo Whatsapp ou Email";
      break;
    case 1:
      if (isUnderWarranty) {
        text =
          "Seu produto já foi avaliado e está aguardando a chegada das peças para fazer o reparo";
      } else {
        text =
          "Seu produto foi avaliado e está aguardando a aprovação do orçamento. Confira seu Whatsapp!";
      }
      break;
    case 2:
      text =
        "Seu produto já foi avaliado e está aguardando a chegada das peças para fazer o reparo";
      break;
    case 3:
      text =
        "Seu produto já está pronto para retirada. Nescessario trazer comprovante da Ordem de Serviço";
      break;
    case 4:
      text = "Seu produto foi finalizado e já foi retirado";
      break;
  }

  if (isBudgetApproved === false && activeStep === 1) {
    text = "O orçamento reprovado, aguarde contato para retirada do produto";
  }

  return text;
};
