import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class UsersModule {}
