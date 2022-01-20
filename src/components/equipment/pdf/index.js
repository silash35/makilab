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
      </table>
    </section>
  );
}

const filter = (string) => {
  if (string == undefined || string == "") {
    return "Não informado";
  } else {
    return string;
  }
};
