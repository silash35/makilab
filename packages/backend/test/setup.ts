import populateDB from "@test/utils/populateDB";

import prisma from "@/database/prisma";

export const setup = async () => {
  await populateDB(2);
};

export const teardown = async () => {
  await prisma.client.deleteMany();
};
