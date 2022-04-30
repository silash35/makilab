import { Client as C, ServiceOrder as S } from "@prisma/client";
import add from "date-fns/add";
import isAfter from "date-fns/isAfter";

interface Client extends C {
  serviceOrders?: ServiceOrder[];
}

interface ServiceOrder extends S {
  owner?: Client;
}

interface ProcessedClient extends C {
  serviceOrders?: ProcessedSO[];
}

interface ProcessedSO extends ServiceOrder {
  statusNumber: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70;
  defaultEmail?: string;
  statusName: string;
  isUrgent: boolean;

  owner?: ProcessedClient;
}

export type { ProcessedClient, ProcessedSO };

export function processClient(client?: Client | Client[] | null) {
  const process = (c: Client): ProcessedClient => {
    const serviceOrders = processSO(c.serviceOrders);

    if (!Array.isArray(serviceOrders) && serviceOrders !== undefined) {
      throw new Error("serviceOrders needs to be an array");
    }

    const processedClient: ProcessedClient = {
      ...c,
      serviceOrders,
    };

    return processedClient;
  };

  if (!client) {
    return undefined;
  }

  if (Array.isArray(client)) {
    return client.map((c) => process(c));
  }

  return process(client);
}

export function processSO(serviceOrder?: ServiceOrder | ServiceOrder[] | null) {
  const process = (s: ServiceOrder): ProcessedSO => {
    const statusNumber = (() => {
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

      if (s.deliveredToCustomerAt != null) {
        return 70;
      }

      if (s.repairedAt != null) {
        return 60;
      }

      if (s.isBudgetApproved === true || s.partsArrivedAt != null) {
        return 50;
      }

      if (s.isBudgetApproved === false) {
        return 40;
      }

      if (s.budgetedAt != null) {
        if (s.isUnderWarranty) {
          return 30;
        } else {
          return 20;
        }
      }

      if (s.registeredInManufacturerAt != null) {
        return 10;
      }

      if (s.isUnderWarranty) {
        return 0;
      } else {
        return 10;
      }
    })();

    const isUrgent =
      statusNumber <= 10 && isAfter(new Date(), add(new Date(s.createdAt), { days: 5 }));
    const defaultEmailStart = `Prezado(a) ${s.owner?.name}, seu produto (${s.equipment} ${s.brand}) de OS ${s.id}`;
    let statusName: string | undefined = undefined;
    let defaultEmail: string | undefined = undefined;

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

    const owner = s.owner ? processClient(s.owner) : undefined;

    if (Array.isArray(owner)) {
      throw new Error("Service Order can't have more than one owner");
    }

    const processedSO: ProcessedSO = {
      ...s,
      statusNumber,
      isUrgent,
      statusName,
      defaultEmail,
      owner,
    };

    return processedSO;
  };

  if (!serviceOrder) {
    return undefined;
  }

  if (Array.isArray(serviceOrder)) {
    return serviceOrder.map((serviceOrder) => process(serviceOrder));
  }

  return process(serviceOrder);
}

export function processPublicSO(serviceOrder: ServiceOrder | null) {
  if (!serviceOrder) {
    return undefined;
  }

  const parsedServiceOrder = {
    id: serviceOrder.id,
    name: `${serviceOrder.equipment}${serviceOrder.brand ? " " + serviceOrder.brand : ""}${
      serviceOrder.model ? " " + serviceOrder.model : ""
    }`,
    isUnderWarranty: serviceOrder.isUnderWarranty,
    isBudgetApproved: serviceOrder.isBudgetApproved,

    createdAt: serviceOrder.createdAt,
    budgetedAt: serviceOrder.budgetedAt,
    budgetAnsweredAt: serviceOrder.budgetAnsweredAt,
    repairedAt: serviceOrder.repairedAt,
    deliveredToCustomerAt: serviceOrder.deliveredToCustomerAt,
  };
  return parsedServiceOrder;
}
