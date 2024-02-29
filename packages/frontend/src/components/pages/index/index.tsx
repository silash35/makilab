import Button from "@mui/material/Button";
import Link from "next/link";

import styles from "./index.module.scss";

const Index = () => (
  <div className={styles.adminMenu}>
    <BigButton color={styles.green} link="admin/newSO">
      Criar nova Ordem de Serviço
    </BigButton>

    <BigButton color={styles.yellow} link="admin/editSOs">
      Gerenciar Ordens de Serviço
    </BigButton>

    <BigButton color={styles.blue} link="admin/newClient">
      Adicionar Cliente
    </BigButton>

    <BigButton color={styles.red} link="admin/editClients">
      Gerenciar Clientes
    </BigButton>
  </div>
);

export default Index;

interface BigButtonProps {
  children: React.ReactNode;
  color: string;
  link: string;
}

const BigButton = ({ children, color, link }: BigButtonProps) => (
  <Button
    className={`${styles.bigButton} ${color}`}
    component={Link}
    href={link}
    variant="contained"
  >
    {children}
  </Button>
);
