import { IsEnum, IsOptional, IsString } from "class-validator";
import { Priority, TaskStatus } from "@prisma/client";

export class QueryTaskDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsString()
  memberId?: string;
}
