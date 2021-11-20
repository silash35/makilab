import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

import styles from "./product.module.scss";

const steps = [
  "Em Avaliação",
  "Aguardando aprovação do orçamento",
  "Aguardando peça",
  "Pronto e disponivel para retirada",
];

export default function Product({ product }) {
  const isStepFailed = (step) => {
    return step === 1;
  };

  if (product === false) {
    return null;
  }

  if (!product.name) {
    return <p>Nenhum produto encontrado, você digitou a OS corretamente?</p>;
  }

  return (
    <section className={styles.product}>
      <p>{product.name}</p>

      <Stepper activeStep={1} orientation="vertical">
        {steps.map((label, index) => {
          const labelProps = {};
          if (isStepFailed(index)) {
            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </section>
  );
}
