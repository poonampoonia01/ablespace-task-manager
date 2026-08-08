import { IsDateString, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Priority, TaskStatus } from "@prisma/client";

export class CreateSubtaskDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  assigneeId?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
