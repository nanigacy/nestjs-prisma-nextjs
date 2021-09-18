import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Request() req: any): Promise<UserModel | null> {
    const userId = req.user.id;
    return this.userService.user({ id: Number(userId) });
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Request() req: any): Promise<UserModel | null> {
    const userId = req.user.id;
    return this.userService.deleteUser({ id: Number(userId) });
  }
}
