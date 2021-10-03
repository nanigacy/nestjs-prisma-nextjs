import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('public')
  async test() {
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
    console.log('✅ GET /users:', postData);
    console.log('✅ email:', postData.email);

    if (!postData.email) return null;

    const user = await this.userService.user({ email: postData.email });
    console.log('✅ Create User:', user);

    // 👇 無い場合は作成する
    if (!user) {
      const user = await this.userService.createUser({
        email: postData.email,
      });
      console.log('✅ Get User:', user);
      return user;
    } else {
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
  @Delete()
  async deleteUser(@Request() req: any): Promise<UserModel | null> {
    const userId = req.user.id;
    return this.userService.deleteUser({ id: Number(userId) });
  }
}
