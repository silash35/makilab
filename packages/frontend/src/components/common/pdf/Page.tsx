import styles from "./page.module.scss";

interface Props {
  children: React.ReactNode;
}

const Page = ({ children }: Props) => {
  return <article className={styles.page}>{children}</article>;
};

export default Page;
