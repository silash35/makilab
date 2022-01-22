import dayjs from "dayjs";

import styles from "./pdf.module.scss";

dayjs.locale("pt-br");

export default function Pdf({ equipment }) {
  const owner = equipment.owner;

  return (
    <section className={styles.page}>
      <Header />
      <table className={styles.table}>
        <Data equipment={equipment} />
        <tr>
          <td colSpan="2" className={styles.disableBorder}>
            <span>Estado: </span>
            {filter(equipment.productCondition)}
          </td>

          <td colSpan="2" className={styles.disableBorder}>
            <span>Garantia: </span>
            {equipment.isUnderWarranty ? "Sim" : "Não"}
          </td>
        </tr>
        <tr>
          <th colSpan="4" className={styles.alignCenter}>
            Descrição do problema (Defeito(s) Reclamado(s))
          </th>
        </tr>
        <tr>
          <td colSpan="4" className={styles.disableBorder}>
            {filter(equipment.problemDescription)}
          </td>
        </tr>
        <tr>
          <td colSpan="4" className={styles.disableBorder}>
            <span>Acessórios: </span>
            {filter(equipment.accessories, "Sem acessórios")}
          </td>
        </tr>
        <tr>
          <td colSpan="4" className={`${styles.disableBorder} ${styles.enableTopBorder}`}>
            Autorizo e concordo com a realização dos serviços listados acima conforme combinado,{" "}
            <br />
            Salvador {dayjs().format("DD/MM/YYYY")}
          </td>
        </tr>
        <tr>
          <td colSpan="2" className={styles.disableBorder}>
            <div className={styles.signature}>{equipment.attendedBy}</div>
          </td>
          <td colSpan="2" className={styles.disableBorder}>
            <div className={styles.signature}> {owner.name}</div>
          </td>
        </tr>
      </table>

      <hr />

      <Header />
      <table className={styles.table}>
        <Data equipment={equipment} variant />
        <tr>
          <th colSpan="4" className={styles.alignCenter}>
            Descrição do problema
          </th>
        </tr>
      </table>
    </section>
  );
}

function Header() {
  return (
    <div className={styles.header}>
      <img src="/logo2.png" alt="Logo da Makilab Serviços" width={150} />
      <h2>Ordem de Serviço de Entrada</h2>
      <ul>
        <li>Makilab Serviços</li>
        <li>71 2132-0220 | 71 98544-7786</li>
        <li>contato@makilab.com</li>
      </ul>
    </div>
  );
}

function Data({ equipment, variant }) {
  const owner = equipment.owner;

  return (
    <>
      <tr>
        <th>Cliente</th>
        <td>{owner.name}</td>
        <th>OS N°</th>
        <td>{equipment.id}</td>
      </tr>
      <tr>
        <th>E-mail</th>
        <td>{filter(owner.email)}</td>
        <th>WhatsApp</th>
        <td>{filter(owner.whatsapp)}</td>
      </tr>
      <tr>
        <th>Endereço</th>
        <td>{filter(owner.address)}</td>
        <th>Telefone</th>
        <td>{filter(owner.phone)}</td>
      </tr>
      <tr>
        <th>CEP</th>
        <td>{filter(owner.zip)}</td>
        <th>CPF/CNPJ</th>
        <td>{filter(owner.cpfOrCnpj)}</td>
      </tr>
      <tr>
        <th>Atendido por</th>
        <td>{filter(equipment.attendedBy)}</td>
        <th>Data de entrada</th>
        <td>{dayjs(equipment.createdAt).format("DD/MM/YYYY")}</td>
      </tr>
      <tr>
        <th>Atendimento</th>
        <td>{filter(equipment.attendedOn)}</td>
        {variant ? (
          <>
            <th>Previsão</th>
            <td>{dayjs(equipment.createdAt).add(1, "M").format("DD/MM/YYYY")}</td>
          </>
        ) : (
          <>
            <th>Hora de entrada</th>
            <td>{dayjs(equipment.createdAt).format("HH:mm")}</td>
          </>
        )}
      </tr>
      <tr>
        <th colSpan="4" className={styles.alignCenter}>
          Equipamento/Marca/Modelo/Lote/PN
        </th>
      </tr>
      <tr>
        <td colSpan="4" className={styles.disableBorder}>
          {equipment.name} {equipment.brand} {equipment.model} {equipment.batchOrImei}
          {equipment.productNumber}
        </td>
      </tr>
    </>
  );
}

const filter = (string, altText = "Não informado") => {
  if (string == undefined || string == "") {
    return altText;
  } else {
    return string;
  }
};
