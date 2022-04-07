import add from "date-fns/add";
import format from "date-fns/format";

import config from "/opensom.config";

import styles from "./pdf.module.scss";
import QrCode from "./qrCode";

export default function Pdf({ equipment }) {
  const owner = equipment.owner;
  const PDF = config.PDF;

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
            Autorizo e concordo com a realização dos serviços listados acima conforme combinado,
            <br />
            {PDF.location} {format(new Date(), "dd/MM/yyyy")}
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
        <tr>
          <td colSpan="4" className={styles.disableBorder}>
            {filter(equipment.problemDescription)}
          </td>
        </tr>
      </table>
      <div className={styles.info}>
        <p>
          IMPORTANTE! Será concedido garantia, desde que o defeito seja de fabricação, de acordo com
          as instruções contidas no Manual do Produto e Certificado de Garantia, e que esteja dentro
          do prazo de garantia. O prazo para conserto em garantia é de até 30 dias. (ART. 18 do
          CDC). Entrega somente mediante a apresentação deste canhoto. Declaro estar ciente que a
          garantia de fábrica cessa quando constatado mau uso. Garantia de balcão, não inclui visita
          técnica. Nosso orçamento é válido por 5 dias. Após 90 dias sem aprovação nem retirada do
          equipamento o mesmo será descartado ou vendido para custear despesas de armazenamento.
        </p>
        <QrCode id={equipment.id} />
      </div>

      <hr />

      <table className={styles.table}>
        <tr>
          <td className={styles.disableBorder}>{filter(owner.name)}</td>
          <td rowSpan="2" className={styles.disableBorder}>
            <strong>
              {equipment.name} {equipment.brand} {equipment.model} {equipment.batchOrImei}
              {equipment.productNumber}
            </strong>
          </td>
        </tr>
        <tr>
          <td className={styles.disableBorder}>
            <strong>NÚMERO DA OS: {filter(equipment.id)}</strong>
          </td>
        </tr>
        <tr>
          <td className={styles.disableBorder}>
            DATA DA ENTRADA: {format(new Date(equipment.createdAt), "dd/MM/yyyy")}
          </td>
          <td rowSpan="2" className={styles.disableBorder}>
            <strong> {filter(equipment.problemDescription)}</strong>
          </td>
        </tr>
        <tr>
          <td className={styles.disableBorder}>WhatsApp: {filter(owner.whatsapp)}</td>
        </tr>
      </table>
    </section>
  );
}

function Header() {
  return (
    <div className={styles.header}>
      <img src="/logo2.png" alt="Logo da Makilab Serviços" width={100} />
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
        <td>{filter(owner.tel)}</td>
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
        <td>{format(new Date(equipment.createdAt), "dd/MM/yyyy")}</td>
      </tr>
      <tr>
        <th>Atendimento</th>
        <td>{filter(equipment.attendedOn)}</td>
        {variant ? (
          <>
            <th>Previsão</th>
            <td>{format(add(new Date(equipment.createdAt), { months: 1 }), "dd/MM/yyyy")}</td>
          </>
        ) : (
          <>
            <th>Hora de entrada</th>
            <td>{format(new Date(equipment.createdAt), "HH:mm")}</td>
          </>
        )}
      </tr>
      <tr>
        <th colSpan="4" className={styles.alignCenter}>
          Equipamento/Marca/Modelo/N° de Serie/PN
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
