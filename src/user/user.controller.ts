import { Controller } from '@nestjs/common';
import { Get, Post, Patch, Delete } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  async getUser(): Promise<string> {
    return 'GET User';
  }

  @Post()
  async postUser(): Promise<string> {
    return 'Post User';
  }

  @Patch()
  async patchUser(): Promise<string> {
    return 'Patch User';
  }

  @Delete()
  async deleteUser(): Promise<string> {
    return 'Delete User';
  }
}
