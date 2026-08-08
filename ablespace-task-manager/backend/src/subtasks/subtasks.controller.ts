import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateSubtaskDto } from "./dto/create-subtask.dto";
import { SubtasksService } from "./subtasks.service";

@Controller()
export class SubtasksController {
  constructor(private readonly service: SubtasksService) {}

  @Get("tasks/:taskId/subtasks")
  findAll(@Param("taskId") taskId: string) {
    return this.service.findAll(taskId);
  }

  @Post("tasks/:taskId/subtasks")
  create(@Param("taskId") taskId: string, @Body() dto: CreateSubtaskDto) {
    return this.service.create(taskId, dto);
  }

  @Patch("subtasks/:id")
  update(@Param("id") id: string, @Body() dto: Partial<CreateSubtaskDto>) {
    return this.service.update(id, dto);
  }

  @Delete("subtasks/:id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
