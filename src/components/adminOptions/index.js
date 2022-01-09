import Link from "next/link";

import styles from "./adminOptions.module.scss";

export default function AdminOptions() {
  return (
    <div className={styles.adminOptions}>
      <Link as="admin/newEquipment" href="admin/newEquipment">
        <a className={styles.red}>Adicionar Equipamento</a>
      </Link>
      <Link as="admin/editEquipments" href="admin/editEquipments">
        <a className={styles.yellow}>Gerenciar Equipamentos</a>
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
