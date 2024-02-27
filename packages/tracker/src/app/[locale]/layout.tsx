"use client";

// Font
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

// Material UI and CSS
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import variables from "@/styles/variables.module.scss";
const theme = createTheme({
  palette: {
    primary: {
      light: variables.primaryLight,
      main: variables.primaryMain,
      dark: variables.primaryDark,
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ubuntu.style.fontFamily,
  },
  components: { MuiButton: { styleOverrides: { root: { fontWeight: "bold", letterSpacing: 1 } } } },
});

// Components
import Layout from "./components/Layout";

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

const MainLayout = ({ children, params: { locale } }: Props) => (
  <html className={ubuntu.className} dir="ltr" lang={locale === "en" ? "en-US" : "pt-BR"}>
    <head>
      <meta content="text/html" httpEquiv="content-type" />
    </head>
    <body>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>{children}</Layout>
      </ThemeProvider>
    </body>
  </html>
);

export default MainLayout;
