import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Req,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

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
    // ポイント1: 👇 passwordをハッシュ化する
    const saltOrRounds = 10;
    const password = await bcrypt.hash(postData.password, saltOrRounds);
    const user = await this.userService.createUser({
      password: password,
      username: postData.username,
    });
    // ポイント2: 👇 access_tokenを返す
    return this.authService.login(user);
  }

  @Get('/auth/google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() req) {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    return this.authService.googleLogin(req);
  }
}
