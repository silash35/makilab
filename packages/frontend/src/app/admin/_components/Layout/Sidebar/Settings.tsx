import MoonIcon from "@mui/icons-material/DarkMode";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

import useTheme from "@/hooks/useTheme";

import styles from "./settings.module.scss";

const IconWrapper = styled("div")(({ theme }) => ({
  margin: 8,
  marginLeft: 0,

  padding: 4,
  borderRadius: "50%",
  backgroundColor: alpha(theme.palette.primary.main, 0.3),
}));

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.settings}>
      <p>Ajustes:</p>
      <div>
        <div>
          <IconWrapper>
            <MoonIcon color="primary" />
          </IconWrapper>
          <p>Tema Escuro:</p>
        </div>
        <Switch checked={theme === "dark"} color="primary" onClick={toggleTheme} />
      </div>
    </div>
  );
};

export default Settings;
