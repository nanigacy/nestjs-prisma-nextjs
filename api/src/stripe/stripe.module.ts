import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user//user.service';
import { StripeController } from './stripe.controller';

@Module({
  imports: [],
  controllers: [StripeController],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class StripeModule {}
