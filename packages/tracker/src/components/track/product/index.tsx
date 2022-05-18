import CircularProgress from "@mui/material/CircularProgress";
import { blue, green } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";

import type { Product } from "@/utils/getProduct";

import Dates from "../dates";
import styles from "./product.module.scss";

const en = {
  notFound: "No products found, did you type the Service Order correctly?",
  unknownError: "Unknown error, please try again later",
};

const pt = {
  notFound: "Nenhum produto encontrado, você digitou a OS corretamente?",
  unknownError: "Erro desconhecido, tente novamente mais tarde",
};

interface Props {
  product: "loading" | "empty" | "Unknown error" | "Not found" | Product;
}

export default function Product({ product }: Props) {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

  const isMobile = useMediaQuery("(max-width: 1100px)");

  if (product === "loading") {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (product === "empty") {
    return null;
  }

  if (product === "Unknown error") {
    return <p>{t.unknownError}</p>;
  }

  if (product === "Not found") {
    return <p>{t.notFound}</p>;
  }

  const theme = createTheme({
    palette: {
      primary: product.isFinished ? green : blue,
    },
  });

  return (
    <Paper elevation={5} className={styles.product} component="section">
      <h2>{product.name}</h2>

      <ThemeProvider theme={theme}>
        <Stepper activeStep={product.activeStep} orientation={isMobile ? "vertical" : "horizontal"}>
          {product.steps.map((step) => {
            return (
              <Step key={step.label}>
                <StepLabel error={step.error}>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </ThemeProvider>

      <div className={styles.flex}>
        <div>
          <p>{product.stepText}</p>
          <Dates product={product} />
        </div>
      </div>
    </Paper>
  );
}