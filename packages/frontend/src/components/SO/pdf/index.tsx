import config from "@config";
import add from "date-fns/add";
import format from "date-fns/format";

import useServiceOrder from "@/hooks/useServiceOrder";
import ServiceOrder from "@/types/serviceOrder";

import styles from "./pdf.module.scss";
import QrCode from "./qrCode";

const { COMPANY, PDF } = config;

interface Props {
  id: string;
}

export default function Pdf({ id }: Props) {
  const { serviceOrder } = useServiceOrder(id);

  if (!serviceOrder) {
    throw new Error("Service order not found");
  }

  const owner = serviceOrder.owner;
  if (!owner) {
    throw new Error("Owner not found");
  }

  return (
    <section className={styles.page}>
      <Header />
      <table className={styles.table}>
        <Data serviceOrder={serviceOrder} />
        <tr>
          <td colSpan={2} className={styles.disableBorder}>
            <span>Estado: </span>
            {filter(serviceOrder.productCondition)}
          </td>

          <td colSpan={2} className={styles.disableBorder}>
            <span>Garantia: </span>
            {serviceOrder.isUnderWarranty ? "Sim" : "Não"}
          </td>
        </tr>
        <tr>
          <th colSpan={4} className={styles.alignCenter}>
            Descrição do problema (Defeito(s) Reclamado(s))
          </th>
        </tr>
        <tr>
          <td colSpan={4} className={styles.disableBorder}>
            {filter(serviceOrder.problemDescription)}
          </td>
        </tr>
        <tr>
          <td colSpan={4} className={styles.disableBorder}>
            <span>Acessórios: </span>
            {filter(serviceOrder.accessories, "Sem acessórios")}
          </td>
        </tr>
        <tr>
          <td colSpan={4} className={`${styles.disableBorder} ${styles.enableTopBorder}`}>
            Autorizo e concordo com a realização dos serviços listados acima conforme combinado,
            <br />
            {COMPANY.city} {format(new Date(), "dd/MM/yyyy")}
          </td>
        </tr>
        <tr>
          <td colSpan={2} className={styles.disableBorder}>
            <div className={styles.signature}>{serviceOrder.attendedBy}</div>
          </td>
          <td colSpan={2} className={styles.disableBorder}>
            <div className={styles.signature}> {owner.name}</div>
          </td>
        </tr>
      </table>

      <hr />

      <Header />
      <table className={styles.table}>
        <Data serviceOrder={serviceOrder} variant />
        <tr>
          <th colSpan={4} className={styles.alignCenter}>
            Descrição do problema
          </th>
        </tr>
        <tr>
          <td colSpan={4} className={styles.disableBorder}>
            {filter(serviceOrder.problemDescription)}
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
        {PDF.hasQrCode && <QrCode id={String(serviceOrder.id)} />}
      </div>

      <hr />

      <table className={styles.table}>
        <tr>
          <td className={styles.disableBorder}>{filter(owner.name)}</td>
          <td rowSpan={2} className={styles.disableBorder}>
            <strong>
              {serviceOrder.equipment} {serviceOrder.brand} {serviceOrder.model}{" "}
              {serviceOrder.batchOrImei} {serviceOrder.productNumber}
            </strong>
          </td>
        </tr>
        <tr>
          <td className={styles.disableBorder}>
            <strong>NÚMERO DA OS: {filter(String(serviceOrder.id))}</strong>
          </td>
        </tr>
        <tr>
          <td className={styles.disableBorder}>
            DATA DA ENTRADA: {format(new Date(serviceOrder.createdAt), "dd/MM/yyyy")}
          </td>
          <td rowSpan={2} className={styles.disableBorder}>
            <strong> {filter(serviceOrder.problemDescription)}</strong>
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
      <img src="/YOUR_COMPANY_LOGO.svg" alt={`Logo da ${COMPANY.name}`} width={100} />
      <h2>Ordem de Serviço de Entrada</h2>
      <ul>
        <li>{COMPANY.name}</li>
        <li>{COMPANY.phones.join(" | ")}</li>
        <li>{COMPANY.email}</li>
      </ul>
    </div>
  );
}

interface DataProps {
  serviceOrder: ServiceOrder;
  variant?: boolean;
}

function Data({ serviceOrder, variant }: DataProps) {
  const owner = serviceOrder.owner;
  if (!owner) {
    throw new Error("Owner not found");
  }

  return (
    <>
      <tr>
        <th>Cliente</th>
        <td>{owner.name}</td>
        <th>OS N°</th>
        <td>{serviceOrder.id}</td>
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
        <td>{filter(serviceOrder.attendedBy)}</td>
        <th>Data de entrada</th>
        <td>{format(new Date(serviceOrder.createdAt), "dd/MM/yyyy")}</td>
      </tr>
      <tr>
        <th>Atendimento</th>
        <td>{filter(serviceOrder.attendedOn)}</td>
        {variant ? (
          <>
            <th>Previsão</th>
            <td>{format(add(new Date(serviceOrder.createdAt), { months: 1 }), "dd/MM/yyyy")}</td>
          </>
        ) : (
          <>
            <th>Hora de entrada</th>
            <td>{format(new Date(serviceOrder.createdAt), "HH:mm")}</td>
          </>
        )}
      </tr>
      <tr>
        <th colSpan={4} className={styles.alignCenter}>
          Equipamento/Marca/Modelo/N° de Serie/PN
        </th>
      </tr>
      <tr>
        <td colSpan={4} className={styles.disableBorder}>
          {serviceOrder.equipment} {serviceOrder.brand} {serviceOrder.model}{" "}
          {serviceOrder.batchOrImei} {serviceOrder.productNumber}
        </td>
      </tr>
    </>
  );
}

const filter = (string: string | null, altText = "Não informado") => {
  if (string === null || string == "") {
    return altText;
  } else {
    return string;
  }
};
