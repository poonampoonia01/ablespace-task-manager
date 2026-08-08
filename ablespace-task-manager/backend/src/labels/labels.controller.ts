import { Controller, Get } from "@nestjs/common";
import { LabelsService } from "./labels.service";

@Controller("labels")
export class LabelsController {
  constructor(private readonly service: LabelsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
