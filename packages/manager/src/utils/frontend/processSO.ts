import add from "date-fns/add";
import isAfter from "date-fns/isAfter";

import { ProcessedSO, ServiceOrder } from "@/types/serviceOrder";

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

export default function processSO(serviceOrder: ServiceOrder) {
  const statusNumber = (() => {
    if (serviceOrder.deliveredToCustomerAt != null) {
      return 70;
    }

    if (serviceOrder.repairedAt != null) {
      return 60;
    }

    if (serviceOrder.isBudgetApproved === true || serviceOrder.partsArrivedAt != null) {
      return 50;
    }

    if (serviceOrder.isBudgetApproved === false) {
      return 40;
    }

    if (serviceOrder.budgetedAt != null) {
      if (serviceOrder.isUnderWarranty) {
        return 30;
      } else {
        return 20;
      }
    }

    if (serviceOrder.registeredInManufacturerAt != null) {
      return 10;
    }

    if (serviceOrder.isUnderWarranty) {
      return 0;
    } else {
      return 10;
    }
  })();
  const isUrgent =
    statusNumber <= 10 && isAfter(new Date(), add(new Date(serviceOrder.createdAt), { days: 5 }));
  const defaultEmailStart = `Prezado(a) ${serviceOrder.owner?.name}, seu produto (${serviceOrder.equipment} ${serviceOrder.brand}) de OS ${serviceOrder.id}`;
  let statusName: string | null = null;
  let defaultEmail: string | null = null;

  switch (statusNumber) {
    case 0:
      statusName = "Esperando criar OSF";
      break;
    case 10:
      statusName = "Esperando Avaliação";
      break;
    case 20:
      statusName = "Aguardando Aprovação";
      defaultEmail = `${defaultEmailStart} foi avaliado e está aguardando a aprovação do orçamento. Confira seu Whatsapp!`;
      break;
    case 30:
      statusName = "Aguardando Peças";
      break;
    case 40:
      statusName = "Orçamento Negado";
      break;
    case 50:
      statusName = "Aguardando Reparo";
      break;
    case 60:
      statusName = "Aguardando Retirada";
      defaultEmail = `${defaultEmailStart} está pronto para retirada. Necessário trazer comprovante da Ordem de Serviço`;
      break;
    case 70:
      statusName = "Finalizado";
      break;
  }

  const processedSO: ProcessedSO = {
    ...serviceOrder,
    statusNumber,
    isUrgent,
    statusName,
    owner: {
      ...serviceOrder.owner,
      defaultEmail: defaultEmail,
    },
  };

  return processedSO;
}
