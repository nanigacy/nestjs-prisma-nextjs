import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.user({ id: Number(id) });
  }

  @Post()
  async createUser(
    @Body() postData: { email: string },
  ): Promise<UserModel | null> {
    return this.userService.createUser(postData);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: { email: string },
  ): Promise<UserModel | null> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: updateData,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
