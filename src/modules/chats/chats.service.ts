import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateChatDto, SendMessageDto } from "./dtos";

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}

  getChats = async (userId: string) => {
    const chats = await this.prisma.chat.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: {
          where: { NOT: { id: userId } },
        },
        messages: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const sorted = chats.sort(
      (a, b) =>
        b.messages[0].createdAt.getTime() - a.messages[0].createdAt.getTime(),
    );

    return sorted;
  };

  getChat = async (chatId: string) => {
    const chat = await this.prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return chat;
  };

  createChat = async ({ receiverId, senderId }: CreateChatDto) => {
    const chat = await this.prisma.chat.create({
      data: {
        users: {
          connect: [
            {
              id: receiverId,
            },
            {
              id: senderId,
            },
          ],
        },
      },
    });

    return {
      chatId: chat.id,
    };
  };

  sendMessage = async (data: SendMessageDto) => {
    const { chat } = await this.prisma.message.create({
      data,
      include: {
        chat: {
          include: { users: true },
        },
      },
    });

    const receiverId = chat.users.find((user) => user.id !== data.senderId).id;

    return receiverId;
  };
}
