import Link from "next/link";

import styles from "./adminOptions.module.scss";

export default function AdminOptions() {
  return (
    <div className={styles.adminOptions}>
      <Link as="admin/newEquipment" href="admin/newEquipment">
        <a className={styles.red}>Adicionar Equipamento</a>
      </Link>
      <button disabled className={styles.disabled}>
        Adicionar Cliente <br />
        (Em breve)
      </button>
      <button disabled className={styles.disabled}>
        Gerenciar Equipamentos <br />
        (Em breve)
      </button>
      <button disabled className={styles.disabled}>
        Gerenciar Clientes <br />
        (Em breve)
      </button>
    </div>
  );
}
