import { Controller, Post, UseGuards } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('change-plan')
  async private() {
    return '✅ Change Plan!';
  }
}
