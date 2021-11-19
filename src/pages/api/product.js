import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function product(req, res) {
  try {
    if (!isNaN(req.query.id)) {
      const search = Number(req.query.id);

      const equipment = await prisma.equipment.findUnique({
        where: {
          id: search,
        },
      });
      res.json(filterEquipment(equipment));
    } else {
      res.json({});
    }
    res.statusCode = 200;
  } catch (err) {
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}

const filterEquipment = (equipment) => {
  const filteredEquipment = {};

  filteredEquipment.name = equipment.name + equipment.brand + equipment.model;
  filteredEquipment.isUnderWarranty = equipment.isUnderWarranty;
  filteredEquipment.isBudgetApproved = equipment.isBudgetApproved;

  filteredEquipment.createdAt = equipment.createdAt;
  filteredEquipment.avalietedAt = equipment.avalietedAt;
  filteredEquipment.budgetApprovedAt = equipment.budgetApprovedAt;
  filteredEquipment.repairedAt = equipment.repairedAt;
  filteredEquipment.deliveredToCustomerAt = equipment.deliveredToCustomerAt;

  return filteredEquipment;
};
