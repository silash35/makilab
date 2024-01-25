import { addDays } from "date-fns/addDays";
import { isAfter } from "date-fns/isAfter";

import processClient from "../client/processor";
import type { ProcessedSO, ServiceOrder } from "./types";
import { Situation } from "./types";

const processSO = (serviceOrder?: ServiceOrder | ServiceOrder[] | null) => {
  const process = (s: ServiceOrder): ProcessedSO => {
    const statusNumber = (() => {
      if (s.deliveredToCustomerAt != null) {
        return Situation.FINALIZED;
      }

      if (s.repairedAt != null) {
        return Situation.WAITING_RETRIEVAL;
      }

      if (s.isBudgetApproved === true || s.partsArrivedAt != null) {
        return Situation.WAITING_REPAIR;
      }

      if (s.isBudgetApproved === false) {
        return Situation.BUDGET_REJECTED;
      }

      if (s.budgetedAt != null) {
        if (s.isUnderWarranty) {
          return Situation.WAITING_PARTS;
        } else {
          return Situation.WAITING_APPROVAL;
        }
      }

      if (s.registeredInManufacturerAt != null) {
        return Situation.WAITING_BUDGET;
      }

      if (s.isUnderWarranty) {
        return Situation.WAITING_OSF;
      } else {
        return Situation.WAITING_BUDGET;
      }
    })();

    const isUrgent =
      statusNumber <= Situation.WAITING_BUDGET &&
      isAfter(new Date(), addDays(new Date(s.createdAt), 5));
    const defaultEmailStart = `Prezado(a) ${s.owner?.name}, seu produto (${s.equipment} ${s.brand}) de OS ${s.id}`;
    let statusName: string | undefined = undefined;
    let defaultEmail: string | undefined = undefined;

    switch (statusNumber) {
      case Situation.WAITING_OSF:
        statusName = "Esperando criar OSF";
        break;
      case Situation.WAITING_BUDGET:
        statusName = "Esperando Avaliação";
        break;
      case Situation.WAITING_APPROVAL:
        statusName = "Aguardando Aprovação";
        defaultEmail = `${defaultEmailStart} foi avaliado e está aguardando a aprovação do orçamento. Confira seu Whatsapp!`;
        break;
      case Situation.WAITING_PARTS:
        statusName = "Aguardando Peças";
        break;
      case Situation.BUDGET_REJECTED:
        statusName = "Orçamento Negado";
        break;
      case Situation.WAITING_REPAIR:
        statusName = "Aguardando Reparo";
        break;
      case Situation.WAITING_RETRIEVAL:
        statusName = "Aguardando Retirada";
        defaultEmail = `${defaultEmailStart} está pronto para retirada. Não se esqueça de trazer o comprovante da Ordem de Serviço`;
        break;
      case Situation.FINALIZED:
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
};

export default processSO;
