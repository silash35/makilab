"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ptBR } from "@mui/material/locale";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

import { createContext, ReactNode, useEffect, useState } from "react";

type PaletteMode = "light" | "dark";

const ThemeContext = createContext({
  theme: "light" as PaletteMode,
  toggleTheme: () => undefined as void,
});
export { ThemeContext };

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<PaletteMode>("light");

  const toggleTheme = () => {
    const newTheme = theme == "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") !== theme) {
        toggleTheme();
      }
    } else {
      localStorage.setItem("theme", theme);
    }
  }, []);

  const muiTheme = createTheme(
    {
      palette: {
        mode: theme,
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
        MuiButton: { styleOverrides: { root: { fontWeight: "bold", letterSpacing: 1 } } },
        MuiTableFooter: {
          styleOverrides: { root: { ">:last-child td": { border: 0 } } },
        },
      },
    },
    ptBR,
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AppRouterCacheProvider>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </AppRouterCacheProvider>
    </ThemeContext.Provider>
  );
};
