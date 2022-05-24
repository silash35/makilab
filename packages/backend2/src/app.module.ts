import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { ServiceOrdersModule } from "./modules/serviceOrders/serviceOrders.module";

@Module({
  imports: [ServiceOrdersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
