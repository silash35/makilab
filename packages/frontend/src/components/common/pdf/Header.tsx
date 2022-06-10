import config from "@config";

import styles from "./header.module.scss";

const { COMPANY } = config;

interface Props {
  title: string;
}

export default function PdfHeader({ title }: Props) {
  return (
    <div className={styles.header}>
      <img src="/YOUR_COMPANY_LOGO.svg" alt={`Logo da ${COMPANY.name}`} width={100} />
      <h2>{title}</h2>
      <ul>
        <li>{COMPANY.name}</li>
        <li>{COMPANY.phones.join(" | ")}</li>
        <li>{COMPANY.email}</li>
      </ul>
    </div>
  );
}
