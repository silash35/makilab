"use client";

import { Box, Typography } from "@mui/material";
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
import en from "./locales/en";
import pt from "./locales/pt";

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
    <Paper
      component="section"
      elevation={5}
      sx={{ maxWidth: "90vw", width: "1200px", margin: 10, padding: 5 }}
    >
      <Typography fontSize={24} fontWeight="bold" marginBottom={4} textAlign="center" variant="h2">
        {t.so} {product.id}: {product.name}
      </Typography>

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

      <Box display="flex" flexDirection="column">
        <p>{product.stepText}</p>
        <Dates product={product} />
      </Box>
    </Paper>
  );
};

export default Product;
