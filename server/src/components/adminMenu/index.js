import Button from "@mui/material/Button";
import Link from "next/link";

import styles from "./adminMenu.module.scss";

export default function AdminMenu() {
  return (
    <div className={styles.adminMenu}>
      <BigButton link="newOS">Criar nova Ordem de Serviço</BigButton>

      <BigButton link="editOSs" color={styles.orange}>
        Gerenciar Ordens de Serviço
      </BigButton>

      <BigButton link="newClient" color={styles.cyan}>
        Adicionar Cliente
      </BigButton>

      <BigButton link="editClients" color={styles.green}>
        Gerenciar Clientes
      </BigButton>
    </div>
  );
}

function BigButton({ children, color, link }) {
  return (
    <Link href={link} passHref>
      <Button variant="contained" component="a" className={`${styles.bigButton} ${color}`}>
        {children}
      </Button>
    </Link>
  );
}
