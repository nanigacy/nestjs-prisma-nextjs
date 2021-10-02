import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UserService, AuthModule],
  exports: [UserService],
})
export class UsersModule {}
