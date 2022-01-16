import prisma from "@/database/prisma";
import removeNull from "@/utils/removeNull";

export default async function product(req, res) {
  try {
    if (!isNaN(req.query.id)) {
      const search = Number(req.query.id);

      const equipment = await prisma.equipment.findUnique({
        where: {
          id: search,
        },
      });
      if (equipment === null) {
        res.json({});
      } else {
        res.json(filterEquipment(equipment));
      }
    } else {
      res.json({});
    }
    res.statusCode = 200;
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}

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
