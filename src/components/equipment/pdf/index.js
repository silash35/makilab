import dayjs from "dayjs";
import Image from "next/image";

import styles from "./pdf.module.scss";

dayjs.locale("pt-br");

export default function Pdf({ equipment }) {
  const owner = equipment.owner;

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <Image src={"/logo.png"} width={144} height={101.5} />
        <h2>Ordem de Serviço de Entrada</h2>
        <ul>
          <li>Makilab Serviços</li>
          <li>71 2132-0220 | 71 98544-7786</li>
          <li>contato@makilab.com</li>
        </ul>
      </div>
      <table className={styles.table}>
        <tr>
          <th>Cliente</th>
          <td>{owner.name}</td>
          <th>OS N°</th>
          <td>{equipment.id}</td>
        </tr>
        <tr>
          <th>E-mail:</th>
          <td>{filter(owner.email)}</td>
          <th>WhatsApp:</th>
          <td>{filter(owner.whatsapp)}</td>
        </tr>
        <tr>
          <th>Endereço:</th>
          <td>{filter(owner.address)}</td>
          <th>Telefone:</th>
          <td>{filter(owner.phone)}</td>
        </tr>
        <tr>
          <th>CEP:</th>
          <td>{filter(owner.zip)}</td>
          <th>CPF/CNPJ:</th>
          <td>{filter(owner.cpfOrCnpj)}</td>
        </tr>
        <tr>
          <th>Atendido por:</th>
          <td>{filter(equipment.attendedBy)}</td>
          <th>Data de entrada:</th>
          <td>{dayjs(equipment.createdAt).format("DD/MM/YYYY")}</td>
        </tr>
        <tr>
          <th>Atendimento:</th>
          <td>{filter(equipment.attendedOn)}</td>
          <th>Hora de entrada:</th>
          <td>{dayjs(equipment.createdAt).format("HH:mm")}</td>
        </tr>
        <tr>
          <th colSpan="4">Equipamento/Marca/Modelo/Lote/PN</th>
        </tr>
        <tr>
          <td colSpan="4">
            {equipment.name} {equipment.brand} {equipment.model} {equipment.batchOrImei}
            {equipment.productNumber}
          </td>
        </tr>
        <tr>
          <th>Estado:</th>
          <td>{filter(equipment.productCondition)}</td>
          <th>Garantia:</th>
          <td>{equipment.isUnderWarranty ? "Sim" : "Não"}</td>
        </tr>
        <tr>
          <th colSpan="4">Descrição do problema (Defeito(s) Reclamado(s))</th>
        </tr>
        <tr>
          <td colSpan="4">{filter(equipment.problemDescription)}</td>
        </tr>
        <tr>
          <td>Acessórios:</td>
          <td colSpan="3">{filter(equipment.accessories, "Sem acessórios")}</td>
        </tr>
        <tr>
          <td colSpan="4">
            Autorizo e concordo com a realização dos serviços listados acima conforme combinado.
          </td>
        </tr>
        <tr>
          <td colSpan="2">{equipment.attendedBy}</td>
          <td colSpan="2">{owner.name}</td>
        </tr>
      </table>
    </section>
  );
}

const filter = (string, altText = "Não informado") => {
  if (string == undefined || string == "") {
    return altText;
  } else {
    return string;
  }
};
