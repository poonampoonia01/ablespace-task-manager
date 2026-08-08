import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async guest() {
    const email = "guest@ablespace.local";

    const user = await this.prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name: "Guest",
        email,
        avatar: "https://i.pravatar.cc/80?img=68"
      }
    });

    return { user };
  }
}
