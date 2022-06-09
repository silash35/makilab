import styles from "./page.module.scss";

interface Props {
  children: React.ReactNode;
}

export default function Page({ children }: Props) {
  return <article className={styles.page}>{children}</article>;
}
