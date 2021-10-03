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
    return '✅ Public API Test!';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('private')
  async private() {
    return '✅ Private API Test!';
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async getUser(
    @Body() postData: { email: string },
  ): Promise<UserModel | null> {
    if (!postData.email) return null;

    // メールアドレスに紐づくUserの取得
    let user = await this.userService.user({ email: postData.email });

    // Userが存在しない場合は作成
    if (!user) {
      // stripeCustomerIdの作成
      const stripeCustomerId = await this.stripeService.createCustomer(
        postData.email,
      );
      const user = await this.userService.createUser({
        email: postData.email,
        stripeCustomerId: stripeCustomerId,
      });
      return user;
    } else {
      // stripeCustomerIdのが無い場合、作成
      if (!user.stripeCustomerId) {
        const stripeCustomerId = await this.stripeService.createCustomer(
          postData.email,
        );
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
    const userId = req.user.id;
    return this.userService.updateUser({
      where: { id: Number(userId) },
      data: updateData,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('delete')
  async deleteUser(
    @Body() updateData: { email: string },
  ): Promise<UserModel | null> {
    return this.userService.deleteUser({ email: updateData.email });
  }
}
