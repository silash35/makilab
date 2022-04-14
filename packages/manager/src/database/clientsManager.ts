import prisma from "./prisma";

class ClientsManager {
  // Read functions
  async getAll() {
    const allClients = await prisma.client.findMany({
      include: {
        serviceOrder: true,
      },
    });

    return allClients;
  }
}

const clientsManager = new ClientsManager();
export default clientsManager;
