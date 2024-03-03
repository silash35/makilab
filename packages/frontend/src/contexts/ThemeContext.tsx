"use client";

import { ptBR } from "@mui/material/locale";
import BaseThemeProvider from "@opensom/next-common/providers/ThemeProvider";
import { createContext, ReactNode, useEffect, useState } from "react";

type PaletteMode = "light" | "dark";

const ThemeContext = createContext({
  theme: "light" as PaletteMode,
  toggleTheme: () => undefined as void,
});
export { ThemeContext };

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BaseThemeProvider localization={ptBR} mode={theme}>
        {children}
      </BaseThemeProvider>
    </ThemeContext.Provider>
  );
};
