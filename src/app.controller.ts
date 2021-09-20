import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signup(@Body() postData: { username: string; password: string }) {
    // TODO: 👇 access_tokenを返す
    const saltOrRounds = 10;
    const password = await bcrypt.hash(postData.password, saltOrRounds);
    return this.userService.createUser({
      password: password,
      username: postData.username,
    });
  }
}
