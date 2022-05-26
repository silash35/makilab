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

enum Status {
  WAITING_OSF,
  WAITING_BUDGET,
  WAITING_APPROVAL,
  WAITING_PARTS,
  BUDGET_REJECTED,
  WAITING_REPAIR,
  WAITING_RETRIEVAL,
  FINALIZED,
}

interface ProcessedSO extends ServiceOrder {
  statusNumber: Status;
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
      if (s.deliveredToCustomerAt != null) {
        return Status.FINALIZED;
      }

      if (s.repairedAt != null) {
        return Status.WAITING_RETRIEVAL;
      }

      if (s.isBudgetApproved === true || s.partsArrivedAt != null) {
        return Status.WAITING_REPAIR;
      }

      if (s.isBudgetApproved === false) {
        return Status.BUDGET_REJECTED;
      }

      if (s.budgetedAt != null) {
        if (s.isUnderWarranty) {
          return Status.WAITING_PARTS;
        } else {
          return Status.WAITING_APPROVAL;
        }
      }

      if (s.registeredInManufacturerAt != null) {
        return Status.WAITING_BUDGET;
      }

      if (s.isUnderWarranty) {
        return Status.WAITING_OSF;
      } else {
        return Status.WAITING_BUDGET;
      }
    })();

    const isUrgent =
      statusNumber <= 10 && isAfter(new Date(), add(new Date(s.createdAt), { days: 5 }));
    const defaultEmailStart = `Prezado(a) ${s.owner?.name}, seu produto (${s.equipment} ${s.brand}) de OS ${s.id}`;
    let statusName: string | undefined = undefined;
    let defaultEmail: string | undefined = undefined;

    switch (statusNumber) {
      case Status.WAITING_OSF:
        statusName = "Esperando criar OSF";
        break;
      case Status.WAITING_BUDGET:
        statusName = "Esperando Avaliação";
        break;
      case Status.WAITING_APPROVAL:
        statusName = "Aguardando Aprovação";
        defaultEmail = `${defaultEmailStart} foi avaliado e está aguardando a aprovação do orçamento. Confira seu Whatsapp!`;
        break;
      case Status.WAITING_PARTS:
        statusName = "Aguardando Peças";
        break;
      case Status.BUDGET_REJECTED:
        statusName = "Orçamento Negado";
        break;
      case Status.WAITING_REPAIR:
        statusName = "Aguardando Reparo";
        break;
      case Status.WAITING_RETRIEVAL:
        statusName = "Aguardando Retirada";
        defaultEmail = `${defaultEmailStart} está pronto para retirada. Não se esqueça de trazer o comprovante da Ordem de Serviço`;
        break;
      case Status.FINALIZED:
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
