import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CommentsService } from "./comments.service";

@Controller()
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Get("tasks/:taskId/comments")
  findAll(@Param("taskId") taskId: string) {
    return this.service.findAll(taskId);
  }

  @Post("tasks/:taskId/comments")
  create(@Param("taskId") taskId: string, @Body() dto: CreateCommentDto) {
    return this.service.create(taskId, dto);
  }
}
