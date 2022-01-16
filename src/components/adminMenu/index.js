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

      <BigButton disabled component={undefined}>
        Gerenciar Clientes <br />
        (Em breve)
      </BigButton>
    </div>
  );
}

function BigButton({ children, color, disabled, component = "a", link }) {
  const button = (
    <Button
      variant="contained"
      component={component}
      disabled={disabled}
      className={`${styles.bigButton} ${color}`}
    >
      {children}
    </Button>
  );

  return disabled ? (
    button
  ) : (
    <Link as={link} href={link}>
      {button}
    </Link>
  );
}
