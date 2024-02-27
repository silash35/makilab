"use client";
import { createTheme } from "@mui/material/styles";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const theme = createTheme({
  palette: {
    primary: {
      light: "#6cf6ae",
      main: "#2ec27e",
      dark: "#009051",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ubuntu.style.fontFamily,
  },
  components: { MuiButton: { styleOverrides: { root: { fontWeight: "bold", letterSpacing: 1 } } } },
});

export default theme;
