import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('public')
  async test() {
    return '✅ Public API!'
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('private')
  async private() {
    return '✅ Private API!'
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUser(@Request() req: any): Promise<UserModel | null> {
    const userId = req.user.id;
    return this.userService.user({ id: Number(userId) });
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
