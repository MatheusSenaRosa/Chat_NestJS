import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { CreateChatDto } from "./dtos";

@Controller("chats")
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createChat(@Body() body: CreateChatDto) {
    return this.chatsService.createChat(body);
  }
}
