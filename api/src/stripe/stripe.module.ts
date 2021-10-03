import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user//user.service';
import { AuthModule } from 'src/auth/auth.module';
import { StripeController } from './stripe.controller';

@Module({
  imports: [],
  controllers: [StripeController],
  providers: [PrismaService, UserService, AuthModule],
  exports: [UserService],
})
export class StripeModule {}
