import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TasksModule } from "./tasks/tasks.module";
import { SubtasksModule } from "./subtasks/subtasks.module";
import { CommentsModule } from "./comments/comments.module";
import { LabelsModule } from "./labels/labels.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    TasksModule,
    SubtasksModule,
    CommentsModule,
    LabelsModule
  ]
})
export class AppModule {}
