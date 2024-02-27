"use client";

import { blue, green } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import useLocale from "@/hooks/useLocale";
import type { Product as TProduct } from "@/utils/getProduct";

import Dates from "./Dates";
import styles from "./product.module.scss";

const en = {
  so: "SO",
};

const pt = {
  so: "OS",
};

interface Props {
  product: TProduct;
}

const Product = ({ product }: Props) => {
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const { locale } = useLocale();
  const t = locale === "en" ? en : pt;

  const theme = createTheme({
    palette: {
      primary: product.isFinished ? green : blue,
    },
  });

  return (
    <Paper className={styles.product} component="section" elevation={5}>
      <h2>
        {t.so} {product.id}: {product.name}
      </h2>

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
};

export default Product;
