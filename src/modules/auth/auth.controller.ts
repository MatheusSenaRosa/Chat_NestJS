import { Body, Controller, Post } from "@nestjs/common";
import { SignInDto } from "./dtos";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signin")
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }
}
