import AccountIcon from "@mui/icons-material/AccountCircle";
import MoonIcon from "@mui/icons-material/DarkMode";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

import useSession from "@/hooks/useSession";
import useTheme from "@/hooks/useTheme";

import styles from "./settings.module.scss";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { signOut } = useSession();

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

      <div className={styles.logout}>
        <div>
          <div className={styles.icon}>
            <AccountIcon color="primary" />
          </div>
          <p>Conta:</p>
        </div>
        <Button onClick={signOut}>Sair</Button>
      </div>
    </div>
  );
}
