import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.usersService.findById(id);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
