import { Module } from "@nestjs/common";
import { PrismaModule, UsersModule, AuthModule, ChatsModule } from "./modules";

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ChatsModule],
})
export class AppModule {}
