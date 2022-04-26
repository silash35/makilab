import { Prisma } from "@prisma/client";

type Client = Prisma.ClientCreateInput;
export type { Client };

type ServiceOrder = Prisma.ServiceOrderCreateWithoutOwnerInput;
export type { ServiceOrder };
