import add from "date-fns/add";
import isAfter from "date-fns/isAfter";

/*
Status Possíveis e seus números:

0: Esperando criar OSF (Somente em equipamentos em garantia)
10: Esperando Avaliação
20: Aguardando Aprovação do Orçamento (Somente em equipamentos fora de garantia)
30: Aguardando Peças
40: Orçamento Negado (Somente em equipamentos fora de garantia)
50: Aguardando Reparo
60: Aguardando Retirada
70: Finalizado
*/

export default function processEquipment(equipment) {
  if (typeof equipment === "object" && equipment != null) {
    let statusNumber = (() => {
      if (equipment.deliveredToCustomerAt != null) {
        return 70;
      }

      if (equipment.repairedAt != null) {
        return 60;
      }

      if (equipment.isBudgetApproved === true || equipment.partsArrivedAt != null) {
        return 50;
      }

      if (equipment.isBudgetApproved === false) {
        return 40;
      }

      if (equipment.avalietedAt != null) {
        if (equipment.isUnderWarranty) {
          return 30;
        } else {
          return 20;
        }
      }

      if (equipment.registeredInManufacturerAt != null) {
        return 10;
      }

      if (equipment.isUnderWarranty) {
        return 0;
      } else {
        return 10;
      }
    })();

    if (
      statusNumber <= 10 &&
      isAfter(new Date(), add(new Date(equipment.createdAt), { days: 5 }))
    ) {
      equipment.isUrgent = true;
    }

    if (!equipment.owner) {
      equipment.owner = {};
    }
    equipment.owner.defaultEmail = null;

    let defaultEmailStart = `Prezado(a) ${equipment.owner?.name}, seu produto (${equipment.name} ${equipment.brand}) de OS ${equipment.id}`;

    switch (statusNumber) {
      case 0:
        equipment.statusName = "Esperando criar OSF";
        break;
      case 10:
        equipment.statusName = "Esperando Avaliação";
        break;
      case 20:
        equipment.statusName = "Aguardando Aprovação";
        equipment.owner.defaultEmail = `${defaultEmailStart} foi avaliado e está aguardando a aprovação do orçamento. Confira seu Whatsapp!`;
        break;
      case 30:
        equipment.statusName = "Aguardando Peças";
        break;
      case 40:
        equipment.statusName = "Orçamento Negado";
        break;
      case 50:
        equipment.statusName = "Aguardando Reparo";
        break;
      case 60:
        equipment.statusName = "Aguardando Retirada";
        equipment.owner.defaultEmail = `${defaultEmailStart} está pronto para retirada. Nescessario trazer comprovante da Ordem de Serviço`;
        break;
      case 70:
        equipment.statusName = "Finalizado";
        break;
    }
  }

  return equipment;
}
