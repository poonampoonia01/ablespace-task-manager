import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, TaskStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { QueryTaskDto } from "./dto/query-task.dto";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  private include = {
    reporter: true,
    members: { include: { user: true } },
    labels: { include: { label: true } },
    subtasks: { include: { assignee: true }, orderBy: { createdAt: "asc" as const } },
    comments: { include: { user: true }, orderBy: { createdAt: "asc" as const } },
    updates: { include: { user: true }, orderBy: { createdAt: "desc" as const } }
  };

  async findAll(query: QueryTaskDto) {
    const where: Prisma.TaskWhereInput = {};

    if (query.search) {
      where.title = { contains: query.search, mode: "insensitive" };
    }

    if (query.status) where.status = query.status;
    if (query.priority) where.priority = query.priority;
    if (query.memberId) {
      where.members = { some: { userId: query.memberId } };
    }

    return this.prisma.task.findMany({
      where,
      include: this.include,
      orderBy: [{ status: "asc" }, { createdAt: "desc" }]
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: this.include
    });

    if (!task) throw new NotFoundException("Task not found");
    return task;
  }

  async create(dto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status ?? TaskStatus.TODO,
        priority: dto.priority,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        reporterId: dto.reporterId,
        members: dto.memberIds?.length
          ? { create: dto.memberIds.map((userId) => ({ userId })) }
          : undefined,
        labels: dto.labelIds?.length
          ? { create: dto.labelIds.map((labelId) => ({ labelId })) }
          : undefined
      },
      include: this.include
    });

    await this.prisma.taskUpdate.create({
      data: {
        taskId: task.id,
        userId: dto.reporterId,
        action: "created this task"
      }
    });

    return this.findOne(task.id);
  }

  async update(id: string, dto: UpdateTaskDto) {
    const current = await this.findOne(id);

    const task = await this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        priority: dto.priority,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined
      },
      include: this.include
    });

    if (dto.status && dto.status !== current.status) {
      await this.prisma.taskUpdate.create({
        data: {
          taskId: id,
          userId: current.reporterId,
          action: "changed status",
          oldValue: current.status,
          newValue: dto.status
        }
      });
    }

    if (dto.priority && dto.priority !== current.priority) {
      await this.prisma.taskUpdate.create({
        data: {
          taskId: id,
          userId: current.reporterId,
          action: "changed priority",
          oldValue: current.priority,
          newValue: dto.priority
        }
      });
    }

    if (dto.memberIds) {
      await this.prisma.taskMember.deleteMany({ where: { taskId: id } });
      if (dto.memberIds.length) {
        await this.prisma.taskMember.createMany({
          data: dto.memberIds.map((userId) => ({ taskId: id, userId }))
        });
      }
    }

    if (dto.labelIds) {
      await this.prisma.taskLabel.deleteMany({ where: { taskId: id } });
      if (dto.labelIds.length) {
        await this.prisma.taskLabel.createMany({
          data: dto.labelIds.map((labelId) => ({ taskId: id, labelId }))
        });
      }
    }

    return task;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.task.delete({ where: { id } });
  }
}
