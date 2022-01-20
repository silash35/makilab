export default function Pdf({ equipment }) {
  return (
    <section>
      <div>Makilab Serviços</div>
      <table>
        <tr>
          <th>Cliente</th>
          <td>{equipment.owner.name}</td>
          <th>OS N°</th>
          <td>{equipment.id}</td>
        </tr>
        <tr>
          <th>E-mail:</th>
          <td>{equipment.owner.email}</td>
          <th>Telefone</th>
          <td>{equipment.owner.whatsapp}</td>
        </tr>
      </table>
    </section>
  );
}
