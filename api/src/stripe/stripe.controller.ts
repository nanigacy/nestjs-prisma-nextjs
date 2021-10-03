import { Controller, Post, UseGuards } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Controller('stripe')
export class StripeController {
  private stripe: Stripe;
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2020-08-27',
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change-plan')
  async private() {
    return '✅ Change Plan!';
  }
}
