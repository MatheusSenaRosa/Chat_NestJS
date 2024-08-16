import { Module } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { ChatsGateway } from "./chats.gateway";
import { ChatsController } from "./chats.controller";

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, ChatsGateway],
})
export class ChatsModule {}
