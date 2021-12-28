export default function processEquipment(equipment) {
  if (typeof equipment === "object" && equipment !== null) {
    equipment.name = (() => {
      if (equipment.deliveredToCustomerAt != null) {
        return "Finalizado";
      }

      if (equipment.repairedAt != null) {
        return "Aguardando Retirada";
      }

      if (equipment.isBudgetApproved === true || equipment.partsArrivedAt != null) {
        return "Aguardando Reparo";
      }

      if (equipment.isBudgetApproved === false) {
        return "Orçamento Negado";
      }

      if (equipment.avalietedAt != null) {
        if (equipment.isUnderWarranty) {
          return "Aguardando Peças";
        } else {
          return "Aguardando Aprovação do Orçamento";
        }
      }

      if (equipment.registeredInManufacturerAt != null) {
        return "Esperando Avaliação";
      }

      if (equipment.isUnderWarranty) {
        return "Esperando criar OSF";
      } else {
        return "Esperando Avaliação";
      }
    })();
  }

  return equipment;
}
