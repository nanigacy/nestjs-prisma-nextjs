import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Req,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('auth/login')
  async login() {
    return null
  }

  @Post('auth/signup')
  async signup() {
    return null
  }
}
