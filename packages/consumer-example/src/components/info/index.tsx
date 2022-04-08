import config from "@config";
import Alert from "@mui/material/Alert";
import styles from "./info.module.scss";
export default function Info() {
  const url = new URL(config.API_URL);
  const link = url.origin;
  return (
    <div className={styles.info}>
      <Alert variant="filled" severity="info">
        <p>
          Esse site é um exemplo de uso da API do{" "}
          <a href="https://github.com/silash35/opensom">OpenSOM</a> para confecção de uma interface
          para os clientes conferirem a situação de suas ordens de serviço.
        </p>
        <p>
          Esta instância utiliza os dados do <a href={link}>Servidor de demonstração</a> do OpenSOM.
        </p>
      </Alert>
    </div>
  );
}
