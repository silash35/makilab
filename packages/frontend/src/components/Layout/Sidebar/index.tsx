import AddOSIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import EditClientsIcon from "@mui/icons-material/ManageAccounts";
import EditOSsIcon from "@mui/icons-material/ManageSearch";
import MenuIcon from "@mui/icons-material/Menu";
import AddClientIcon from "@mui/icons-material/PersonAdd";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import useSession from "@/hooks/useSession";

import Settings from "./Settings";
import styles from "./sidebar.module.scss";

const Sidebar = () => {
  const matches = useMediaQuery("(max-width: 1023px)");
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useSession();

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
        onClose={() => setIsOpen(false)}
        open={isOpen}
        variant={matches ? "temporary" : "permanent"}
      >
        <div onClick={() => setIsOpen(false)} style={{ display: "contents" }}>
          <Link className={styles.image} href="/">
            <img alt="OpenSOM, with SOM written in green" height="40" src="/text.svg" />
          </Link>
          <Divider />
          <List>
            <ListLink Icon={HomeIcon} href="/" text="Página Inicial" />
            <ListLink Icon={AddOSIcon} href="/admin/newSO" text="Criar nova OS" />
            <ListLink Icon={EditOSsIcon} href="/admin/editSOs" text="Gerenciar OSs" />
            <ListLink Icon={AddClientIcon} href="/admin/newClient" text="Cadastrar Cliente" />
            <ListLink Icon={EditClientsIcon} href="/admin/editClients" text="Gerenciar Clientes" />

            <ListItemButton onClick={signOut}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </List>
        </div>
        <Settings />
      </Drawer>
    </aside>
  );
};

export default Sidebar;

interface ListLinkProps {
  href: string;
  text: string;
  Icon: React.FC;
}

const ListLink = ({ href, text, Icon }: ListLinkProps) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <ListItemButton className={router.pathname === href ? styles.active : undefined}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </Link>
  );
};
