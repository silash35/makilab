import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  home(): string {
    return "This is a backend of OpenSOM. Where the magic happens.";
  }
}
