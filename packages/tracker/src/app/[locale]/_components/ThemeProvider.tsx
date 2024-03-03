"use client";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
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

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
        scrollBehavior: "smooth",
      },
      main: { display: "contents" },
    }}
  />
);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <AppRouterCacheProvider>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      {children}
    </MuiThemeProvider>
  </AppRouterCacheProvider>
);

export default ThemeProvider;
