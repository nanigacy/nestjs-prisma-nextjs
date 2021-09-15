import {
  Controller,
  Query,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.user({ id: Number(id) });
  }

  // Note: Queryを使用する場合
  @Get()
  async getUserById(): Promise<string> {
    return 'Get User';
  }
  // async getUserById(@Query() query: { id: string }): Promise<UserModel | null> {
  //   return this.userService.user({ id: Number(query.id) });
  // }

  @Post()
  async postUser(): Promise<string> {
    return 'Post User';
  }

  @Put()
  async patchUser(): Promise<string> {
    return 'Patch User';
  }

  @Delete()
  async deleteUser(): Promise<string> {
    return 'Delete User';
  }
}
