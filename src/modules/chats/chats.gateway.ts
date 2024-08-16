import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatsService } from "./chats.service";
import { SendMessageDto } from "./dtos";

@WebSocketGateway()
export class ChatsGateway {
  @WebSocketServer() server: Server;

  constructor(private chatsService: ChatsService) {}

  @SubscribeMessage("getChats")
  async getChats(
    @MessageBody() sessionId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`chats-${sessionId}`);

    const chats = await this.chatsService.getChats(sessionId);

    return {
      event: "chats",
      data: chats,
    };
  }

  @SubscribeMessage("getChat")
  async getChat(
    @MessageBody() chatId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`chat-${chatId}`);

    const chat = await this.chatsService.getChat(chatId);

    return {
      event: "chat",
      data: chat,
    };
  }

  @SubscribeMessage("sendMessage")
  async sendMessage(
    @MessageBody()
    body: SendMessageDto,
  ) {
    const { senderId, chatId, text } = body;

    const receiverId = await this.chatsService.sendMessage({
      chatId,
      text: text.trim(),
      senderId,
    });

    const [senderChats, receiverChats, chat] = await Promise.all([
      this.chatsService.getChats(senderId),
      this.chatsService.getChats(receiverId),
      this.chatsService.getChat(body.chatId),
    ]);

    this.server.to(`chats-${senderId}`).emit("chats", senderChats);
    this.server.to(`chats-${receiverId}`).emit("chats", receiverChats);

    this.server.to(`chat-${body.chatId}`).emit("chat", chat);
  }
}
