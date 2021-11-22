import styles from "./adminOptions.module.scss";

export default function AdminOptions() {
  return (
    <div className={styles.adminOptions}>
      <button className={styles.red}>Adicionar Equipamento</button>
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
