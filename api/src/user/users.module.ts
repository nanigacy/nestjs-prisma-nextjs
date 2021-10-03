import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { StripeService } from 'src/stripe/stripe.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UserService, StripeService],
  exports: [UserService],
})
export class UsersModule {}
