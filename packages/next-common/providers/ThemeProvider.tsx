"use client";

import type { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { type Localization } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Ubuntu } from "next/font/google";
import React from "react";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const globalStyles = (
  <GlobalStyles
    styles={{
      "html, body": {
        height: "100%",
        scrollBehavior: "smooth",

        display: "flex",
        flexDirection: "column",
      },
    }}
  />
);

interface Props {
  children: React.ReactNode;
  mode?: PaletteMode;
  localization?: Localization;
}

const ThemeProvider = ({ children, mode, localization }: Props) => {
  const theme = createTheme(
    {
      palette: {
        mode,
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
      components: {
        MuiTableFooter: {
          styleOverrides: { root: { ">:last-child td": { border: 0 } } },
        },
      },
    },
    localization ? localization : {},
  );

  return (
    <AppRouterCacheProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        {children}
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default ThemeProvider;
