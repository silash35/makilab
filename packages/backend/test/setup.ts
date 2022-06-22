import createClients from "@test/utils/createClients";

export const setup = async () => {
  await createClients(2);
};

/*
import prisma from "@/database/prisma";

export const teardown = async () => {
  await prisma.client.deleteMany();
};
*/
