import prisma from "@/database/prisma";

class PublicSOService {
  getOne = async (id: number) => {
    return await prisma.serviceOrder.findUnique({
      where: { id },
    });
  };
}

const publicSOService = new PublicSOService();

export default publicSOService;
