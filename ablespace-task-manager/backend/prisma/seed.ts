import { PrismaClient, Priority, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.taskUpdate.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.subtask.deleteMany();
  await prisma.taskLabel.deleteMany();
  await prisma.taskMember.deleteMany();
  await prisma.task.deleteMany();
  await prisma.label.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      avatar: "https://i.pravatar.cc/80?img=12"
    }
  });

  const designer = await prisma.user.create({
    data: {
      name: "Designer",
      email: "designer@example.com",
      avatar: "https://i.pravatar.cc/80?img=47"
    }
  });

  const qa = await prisma.user.create({
    data: {
      name: "QA Team",
      email: "qa@example.com",
      avatar: "https://i.pravatar.cc/80?img=32"
    }
  });

  const security = await prisma.user.create({
    data: {
      name: "Security",
      email: "security@example.com",
      avatar: "https://i.pravatar.cc/80?img=51"
    }
  });

  const labels = await Promise.all([
    prisma.label.create({ data: { name: "Deployment", color: "#8B5CF6" } }),
    prisma.label.create({ data: { name: "Design", color: "#EC4899" } }),
    prisma.label.create({ data: { name: "Testing", color: "#22C55E" } }),
    prisma.label.create({ data: { name: "Research", color: "#F59E0B" } }),
    prisma.label.create({ data: { name: "Development", color: "#3B82F6" } }),
    prisma.label.create({ data: { name: "Passed", color: "#14B8A6" } }),
    prisma.label.create({ data: { name: "Audit", color: "#EF4444" } })
  ]);

  const byName = Object.fromEntries(labels.map((l) => [l.name, l]));

  const tasks = [
    {
      title: "Write API Documentation",
      status: TaskStatus.TODO,
      priority: Priority.HIGH,
      reporterId: admin.id,
      dueDate: new Date("2026-07-29"),
      memberId: admin.id,
      labelNames: ["Deployment"]
    },
    {
      title: "Implement Search Function",
      status: TaskStatus.TODO,
      priority: Priority.MEDIUM,
      reporterId: admin.id,
      dueDate: new Date("2026-07-29"),
      memberId: admin.id,
      labelNames: ["Development"]
    },
    {
      title: "Deploy to Production",
      status: TaskStatus.TODO,
      priority: Priority.HIGH,
      reporterId: admin.id,
      dueDate: new Date("2026-07-29"),
      memberId: admin.id,
      labelNames: ["Deployment"]
    },
    {
      title: "Code Review Completed",
      status: TaskStatus.DOING,
      priority: Priority.HIGH,
      reporterId: admin.id,
      dueDate: new Date("2026-07-29"),
      memberId: admin.id,
      labelNames: ["Deployment"]
    },
    {
      title: "Design Mockups Finalized",
      status: TaskStatus.DOING,
      priority: Priority.MEDIUM,
      reporterId: admin.id,
      dueDate: new Date("2026-07-29"),
      memberId: designer.id,
      labelNames: ["Design", "Development"]
    },
    {
      title: "Feature Testing Passed",
      status: TaskStatus.COMPLETED,
      priority: Priority.MEDIUM,
      reporterId: qa.id,
      dueDate: new Date("2026-07-30"),
      memberId: qa.id,
      labelNames: ["Testing", "Passed"]
    },
    {
      title: "UI Design Updated",
      status: TaskStatus.COMPLETED,
      priority: Priority.LOW,
      reporterId: designer.id,
      dueDate: new Date("2026-07-31"),
      memberId: designer.id,
      labelNames: ["Design", "Passed"]
    },
    {
      title: "Security Audit Scheduled",
      status: TaskStatus.COMPLETED,
      priority: Priority.HIGH,
      reporterId: security.id,
      dueDate: new Date("2026-08-01"),
      memberId: security.id,
      labelNames: ["Audit", "Testing"]
    },
    {
      title: "UI Review",
      status: TaskStatus.ON_HOLD,
      priority: Priority.MEDIUM,
      reporterId: designer.id,
      dueDate: new Date("2026-08-02"),
      memberId: designer.id,
      labelNames: ["Review"]
    },
    {
      title: "Backend Integration",
      status: TaskStatus.ON_HOLD,
      priority: Priority.HIGH,
      reporterId: admin.id,
      dueDate: new Date("2026-08-03"),
      memberId: admin.id,
      labelNames: ["Development"]
    },
    {
      title: "Performance Optimization",
      status: TaskStatus.ON_HOLD,
      priority: Priority.LOW,
      reporterId: admin.id,
      dueDate: new Date("2026-08-04"),
      memberId: admin.id,
      labelNames: ["Development"]
    }
  ];

  for (const item of tasks) {
    const created = await prisma.task.create({
      data: {
        title: item.title,
        status: item.status,
        priority: item.priority,
        reporterId: item.reporterId,
        dueDate: item.dueDate,
        members: { create: [{ userId: item.memberId }] },
        labels: {
          create: item.labelNames.map((name) => {
            const label = byName[name] ?? null;
            return label
              ? { labelId: label.id }
              : { label: { create: { name, color: "#64748B" } } };
          })
        }
      }
    });

    await prisma.taskUpdate.create({
      data: {
        taskId: created.id,
        userId: item.reporterId,
        action: "created this task"
      }
    });
  }

  const detailTask = await prisma.task.findFirst({
    where: { title: "Write API Documentation" }
  });

  if (detailTask) {
    await prisma.subtask.createMany({
      data: [
        {
          taskId: detailTask.id,
          title: "Subtask 1",
          priority: Priority.HIGH,
          assigneeId: admin.id,
          dueDate: new Date("2026-09-12")
        },
        {
          taskId: detailTask.id,
          title: "Subtask 2",
          priority: Priority.LOW,
          assigneeId: designer.id,
          dueDate: new Date("2026-09-15")
        },
        {
          taskId: detailTask.id,
          title: "Subtask 3",
          priority: Priority.MEDIUM,
          dueDate: new Date("2026-09-18")
        }
      ]
    });

    await prisma.comment.create({
      data: {
        taskId: detailTask.id,
        userId: admin.id,
        content: "API documentation structure is ready for review."
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
