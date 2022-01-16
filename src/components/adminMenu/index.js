import Button from "@mui/material/Button";
import Link from "next/link";

import styles from "./adminMenu.module.scss";

export default function AdminMenu() {
  return (
    <div className={styles.adminMenu}>
      <BigButton link="admin/newOS">Criar nova Ordem de Serviço</BigButton>

      <BigButton
        link="admin/editOSs"
        style={{
          backgroundColor: "#ff9926",
          "&:focus": {
            backgroundColor: "#ffba6b",
          },
          "&:hover": {
            backgroundColor: "#ff8800",
          },
        }}
      >
        Gerenciar Ordens de Serviço
      </BigButton>

      <BigButton
        link="admin/newClient"
        style={{
          backgroundColor: "#00e4c5",
          "&:focus": {
            backgroundColor: "#41ffe6",
          },
          "&:hover": {
            backgroundColor: "#1daa97",
          },
        }}
      >
        Adicionar Cliente
      </BigButton>

      <BigButton disabled component={undefined}>
        Gerenciar Clientes <br />
        (Em breve)
      </BigButton>
    </div>
  );
}

function BigButton({ children, style, disabled, component = "a", link }) {
  const sx = {
    width: "250px",
    height: "180px",
    padding: "16px",
    margin: "40px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "larger",
    borderRadius: "16px",
    textTransform: "none",

    ...style,
  };

  const button = (
    <Button variant="contained" component={component} sx={sx} disabled={disabled}>
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
