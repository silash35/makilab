import createClients from "@test/utils/createClients";

import prisma from "@/database/prisma";

export const setup = async () => {
  await createClients(2);
};

export const teardown = async () => {
  await prisma.client.deleteMany();
};
