import config from "@config";

import styles from "./header.module.scss";

const { COMPANY } = config;

interface Props {
  title: string;
}

const PdfHeader = ({ title }: Props) => {
  return (
    <div className={styles.header}>
      <img alt={`Logo da ${COMPANY.name}`} src="/YOUR_COMPANY_LOGO.svg" width={100} />
      <h2>{title}</h2>
      <ul>
        <li>{COMPANY.name}</li>
        <li>{COMPANY.phones.join(" | ")}</li>
        <li>{COMPANY.email}</li>
      </ul>
    </div>
  );
};

export default PdfHeader;
