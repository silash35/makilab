import Button from "@mui/material/Button";
import Link from "next/link";

import styles from "./adminMenu.module.scss";

export default function AdminMenu() {
  return (
    <div className={styles.adminMenu}>
      <BigButton link="admin/newOS">Criar nova Ordem de Serviço</BigButton>

      <BigButton link="admin/editOSs" color={styles.orange}>
        Gerenciar Ordens de Serviço
      </BigButton>

      <BigButton link="admin/newClient" color={styles.cyan}>
        Adicionar Cliente
      </BigButton>

      <BigButton link="admin/editClients" color={styles.green}>
        Gerenciar Clientes
      </BigButton>
    </div>
  );
}

function BigButton({ children, color, link }) {
  return (
    <Link as={link} href={link}>
      <Button variant="contained" component="a" className={`${styles.bigButton} ${color}`}>
        {children}
      </Button>
    </Link>
  );
}
