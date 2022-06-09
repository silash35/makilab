import AddOSIcon from "@mui/icons-material/Add";
import MoonIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import EditClientsIcon from "@mui/icons-material/ManageAccounts";
import EditOSsIcon from "@mui/icons-material/ManageSearch";
import MenuIcon from "@mui/icons-material/Menu";
import AddClientIcon from "@mui/icons-material/PersonAdd";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import useTheme from "@/hooks/useTheme";

import styles from "./sidebar.module.scss";

export default function Sidebar() {
  const matches = useMediaQuery("(max-width: 1023px)");
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={styles.aside}>
      {matches && (
        <div className={styles.menuButton}>
          <IconButton aria-label="Open Menu" onClick={() => setIsOpen(true)}>
            <MenuIcon />
          </IconButton>
        </div>
      )}
      <Drawer
        className={styles.drawer}
        variant={matches ? "temporary" : "permanent"}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div onClick={() => setIsOpen(false)} style={{ display: "contents" }}>
          <Link href="/">
            <a className={styles.image}>
              <img alt="OpenSOM, with SOM written in green" src="/text.svg" height="40" />
            </a>
          </Link>

          <Divider />

          <List>
            <ListLink href="/" text="Página Inicial" Icon={HomeIcon} />
            <ListLink href="/admin/newSO" text="Criar nova OS" Icon={AddOSIcon} />
            <ListLink href="/admin/editSOs" text="Gerenciar OSs" Icon={EditOSsIcon} />
            <ListLink href="/admin/newClient" text="Cadastrar cliente" Icon={AddClientIcon} />
            <ListLink href="/admin/editClients" text="Gerenciar Clientes" Icon={EditClientsIcon} />
          </List>
        </div>

        <div className={styles.config}>
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
      </Drawer>
    </aside>
  );
}

interface ListLinkProps {
  href: string;
  text: string;
  Icon: React.FC;
}

const ListLink = ({ href, text, Icon }: ListLinkProps) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a>
        <ListItem button className={router.pathname === href ? styles.active : undefined}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </a>
    </Link>
  );
};
