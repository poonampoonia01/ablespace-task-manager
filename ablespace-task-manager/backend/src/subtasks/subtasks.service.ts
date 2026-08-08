import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSubtaskDto } from "./dto/create-subtask.dto";

@Injectable()
export class SubtasksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(taskId: string) {
    return this.prisma.subtask.findMany({
      where: { taskId },
      include: { assignee: true },
      orderBy: { createdAt: "asc" }
    });
  }

  create(taskId: string, dto: CreateSubtaskDto) {
    return this.prisma.subtask.create({
      data: {
        taskId,
        title: dto.title,
        priority: dto.priority,
        status: dto.status,
        assigneeId: dto.assigneeId,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined
      },
      include: { assignee: true }
    });
  }

  update(id: string, dto: Partial<CreateSubtaskDto>) {
    return this.prisma.subtask.update({
      where: { id },
      data: {
        title: dto.title,
        priority: dto.priority,
        status: dto.status,
        assigneeId: dto.assigneeId,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined
      },
      include: { assignee: true }
    });
  }

  remove(id: string) {
    return this.prisma.subtask.delete({ where: { id } });
  }
}
