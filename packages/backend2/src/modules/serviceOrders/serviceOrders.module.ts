import { Module } from "@nestjs/common";

import { PrismaService } from "@/database/prismaService";

import { ServiceOrdersController } from "./serviceOrders.controller";
import { ServiceOrdersService } from "./serviceOrders.service";

@Module({
  controllers: [ServiceOrdersController],
  providers: [PrismaService, ServiceOrdersService],
})
export class ServiceOrdersModule {}
