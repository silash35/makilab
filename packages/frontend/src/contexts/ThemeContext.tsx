import CssBaseline from "@mui/material/CssBaseline";
import { ptBR } from "@mui/material/locale";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createContext, ReactNode, useEffect, useState } from "react";

import variables from "@/styles/variables.module.scss";

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
          light: variables.primaryLight,
          main: variables.primaryMain,
          dark: variables.primaryDark,
          contrastText: "#fff",
        },
      },
      typography: {
        fontFamily: ["Ubuntu", "sans-serif"].join(","),
      },
      components: {
        MuiButton: { styleOverrides: { root: { fontWeight: "bold", letterSpacing: 1 } } },
        MuiTableFooter: {
          styleOverrides: { root: { ">:last-child td": { border: 0 } } },
        },
      },
    },
    ptBR
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
