import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { StripeService } from 'src/stripe/stripe.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly stripeService: StripeService,
  ) {}

  @Get('public')
  async public() {
    return { message: '✅ Public API Test!' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('private')
  async private(@Request() req) {
    return { message: '✅ Private API Test!', payload: req.user };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async getUser(@Request() req): Promise<UserModel | null> {
    const email = req.user['https://example.com/email'];
    const auth0Sub = req.user.sub; // Auth0のユーザーID

    // メールアドレスに紐づくUserの取得
    let user = await this.userService.user({ auth0Sub: auth0Sub });

    // Userが存在しない場合は作成
    if (!user) {
      // stripeCustomerIdの作成
      const stripeCustomerId = await this.stripeService.createCustomer(email);
      const user = await this.userService.createUser({
        email: req.user['https://example.com/email'],
        auth0Sub: req.user.sub,
        stripeCustomerId: stripeCustomerId,
      });
      return user;
    } else {
      // stripeCustomerIdのが無い場合、作成
      if (!user.stripeCustomerId) {
        const stripeCustomerId = await this.stripeService.createCustomer(email);
        user = await this.userService.updateUser({
          where: { id: Number(user.id) },
          data: { stripeCustomerId: stripeCustomerId },
        });
      }
      return user;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateUser(
    @Request() req: any,
    @Body() updateData: { email: string },
  ): Promise<UserModel | null> {
    const auth0Sub = req.user.sub; // Auth0のユーザーID
    return this.userService.updateUser({
      where: { auth0Sub: auth0Sub },
      data: updateData,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('delete')
  async deleteUser(@Request() req): Promise<UserModel | null> {
    const auth0Sub = req.user.sub; // Auth0のユーザーID
    return this.userService.deleteUser({ auth0Sub: auth0Sub });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('attach-payment-method')
  async attachPaymentMethod(
    @Request() req,
    @Body() postData: { paymentMethod: any },
  ): Promise<any> {
    const email = req.user['https://example.com/email'];
    let user = await this.userService.user({ email: email });

    const stripePaymentMethod = await this.stripeService.attachPaymentMethod(
      postData.paymentMethod.id,
      user.stripeCustomerId,
    );

    user = await this.userService.updateUser({
      where: { email: user.email },
      data: {
        stripeCardBrand: stripePaymentMethod.card.brand,
        stripeCardLastFour: stripePaymentMethod.card.last4,
      },
    });

    return user;
  }
}
