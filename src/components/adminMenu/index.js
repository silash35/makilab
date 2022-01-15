import Link from "next/link";

import styles from "./adminMenu.module.scss";

export default function AdminMenu() {
  return (
    <div className={styles.adminMenu}>
      <Link as="admin/newOS" href="admin/newOS">
        <a className={styles.red}>Criar nova Ordem de Serviço</a>
      </Link>
      <Link as="admin/editOSs" href="admin/editOSs">
        <a className={styles.yellow}>Gerenciar Ordens de Serviço</a>
      </Link>
      <Link as="admin/newClient" href="admin/newClient">
        <a className={styles.cyan}>Adicionar Cliente</a>
      </Link>

      <button disabled className={styles.disabled}>
        Gerenciar Clientes <br />
        (Em breve)
      </button>
    </div>
  );
}
