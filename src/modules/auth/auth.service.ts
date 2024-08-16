import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SignInDto } from "./dtos";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  findByNickname = async (nickname: string) => {
    const user = await this.prisma.user.findUnique({
      where: { nickname: nickname.trim() },
    });

    return user;
  };

  signIn = async ({ nickname }: SignInDto) => {
    const foundUser = await this.findByNickname(nickname);

    if (foundUser) {
      return foundUser;
    }

    const createdUser = await this.prisma.user.create({
      data: { nickname: nickname.trim() },
    });

    return createdUser;
  };
}
