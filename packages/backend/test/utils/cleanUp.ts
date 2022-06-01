import prisma from "@/database/prisma";

const cleanUp = async () => {
  console.log("Clean up");

  await prisma.budgetItem.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.serviceOrder.deleteMany();
  await prisma.client.deleteMany();
};

export default cleanUp;
