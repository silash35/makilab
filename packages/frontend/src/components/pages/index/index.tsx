import Button from "@mui/material/Button";
import Link from "next/link";

import styles from "./index.module.scss";

export default function Index() {
  return (
    <div className={styles.adminMenu}>
      <BigButton link="admin/newSO" color={styles.green}>
        Criar nova Ordem de Serviço
      </BigButton>

      <BigButton link="admin/editSOs" color={styles.yellow}>
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
