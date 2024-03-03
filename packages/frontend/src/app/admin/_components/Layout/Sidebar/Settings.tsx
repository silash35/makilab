import MoonIcon from "@mui/icons-material/DarkMode";
import Switch from "@mui/material/Switch";

import useTheme from "@/hooks/useTheme";

import styles from "./settings.module.scss";

const Settings = () => {
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
        <Switch checked={theme === "dark"} color="primary" onClick={toggleTheme} />
      </div>
    </div>
  );
};

export default Settings;
