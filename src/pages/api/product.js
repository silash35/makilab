import prisma from "@/database/prisma";
import apiFactory from "@/utils/apiFactory";
import removeNull from "@/utils/removeNull";

const methods = {
  async GET(req, res) {
    if (isNaN(req.query.id)) {
      throw { name: "Not Found" };
    }

    const search = Number(req.query.id);
    const equipment = await prisma.equipment.findUnique({
      where: {
        id: search,
      },
    });

    if (equipment === null) {
      throw { name: "Not Found" };
    }

    res.json(filterEquipment(equipment));
    res.statusCode = 200;
  },
};

export default apiFactory(methods, false);

const filterEquipment = (equipment) => {
  const filteredEquipment = {};

  filteredEquipment.id = equipment.id;

  filteredEquipment.name = `${equipment.name}  ${removeNull(equipment.brand)}  ${removeNull(
    equipment.model
  )}`;
  filteredEquipment.isUnderWarranty = equipment.isUnderWarranty;
  filteredEquipment.isBudgetApproved = equipment.isBudgetApproved;

  filteredEquipment.createdAt = equipment.createdAt;
  filteredEquipment.avalietedAt = equipment.avalietedAt;
  filteredEquipment.budgetAnsweredAt = equipment.budgetAnsweredAt;
  filteredEquipment.repairedAt = equipment.repairedAt;
  filteredEquipment.deliveredToCustomerAt = equipment.deliveredToCustomerAt;

  return filteredEquipment;
};
