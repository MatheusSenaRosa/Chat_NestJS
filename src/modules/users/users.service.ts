import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findById = async (id: string) => {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  };

  getUsers = async () => {
    const users = await this.prisma.user.findMany({
      orderBy: {
        nickname: "asc",
      },
    });

    return users;
  };
}
