import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  async getUserById(): Promise<string> {
    return 'GET User';
  }
}
