import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(taskId: string) {
    return this.prisma.comment.findMany({
      where: { taskId },
      include: { user: true },
      orderBy: { createdAt: "asc" }
    });
  }

  async create(taskId: string, dto: CreateCommentDto) {
    const comment = await this.prisma.comment.create({
      data: {
        taskId,
        userId: dto.userId,
        content: dto.content
      },
      include: { user: true }
    });

    await this.prisma.taskUpdate.create({
      data: {
        taskId,
        userId: dto.userId,
        action: "posted an update"
      }
    });

    return comment;
  }
}
