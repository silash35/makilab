import { Controller, Get } from "@nestjs/common";

import { ServiceOrdersService } from "./serviceOrders.service";

@Controller("api/private/serviceOrders")
export class ServiceOrdersController {
  constructor(private readonly serviceOrdersService: ServiceOrdersService) {}

  @Get()
  async getAll() {
    return this.serviceOrdersService.getAll();
  }
}
