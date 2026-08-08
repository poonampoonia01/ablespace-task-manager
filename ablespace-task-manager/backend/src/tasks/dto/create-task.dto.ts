import { IsDateString, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Priority, TaskStatus } from "@prisma/client";

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsString()
  reporterId!: string;

  @IsOptional()
  memberIds?: string[];

  @IsOptional()
  labelIds?: string[];
}
