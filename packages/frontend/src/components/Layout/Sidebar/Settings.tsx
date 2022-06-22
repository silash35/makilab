import MoonIcon from "@mui/icons-material/DarkMode";
import Switch from "@mui/material/Switch";

import useTheme from "@/hooks/useTheme";

import styles from "./settings.module.scss";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.settings}>
      <p>Ajustes:</p>
      <div>
        <div>
          <div className={styles.icon}>
            <MoonIcon color="primary" />
          </div>
          <p>Tema Escuro:</p>
        </div>
        <Switch color="primary" checked={theme === "dark"} onClick={toggleTheme} />
      </div>
    </div>
  );
}
