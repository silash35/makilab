import Button from "@mui/material/Button";
import Link from "next/link";

import styles from "./adminMenu.module.scss";

export default function AdminMenu() {
  return (
    <div className={styles.adminMenu}>
      <BigButton link="admin/newOS" color={styles.green}>
        Criar nova Ordem de Serviço
      </BigButton>

      <BigButton link="admin/editOSs" color={styles.yellow}>
        Gerenciar Ordens de Serviço
      </BigButton>

      <BigButton link="admin/newClient" color={styles.blue}>
        Adicionar Cliente
      </BigButton>

      <BigButton link="admin/editClients" color={styles.red}>
        Gerenciar Clientes
      </BigButton>
    </div>
  );
}

interface BigButtonProps {
  children: React.ReactNode;
  color: string;
  link: string;
}

function BigButton({ children, color, link }: BigButtonProps) {
  return (
    <Link href={link} passHref>
      <Button variant="contained" component="a" className={`${styles.bigButton} ${color}`}>
        {children}
      </Button>
    </Link>
  );
}
