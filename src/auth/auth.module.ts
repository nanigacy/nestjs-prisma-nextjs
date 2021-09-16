import { Module } from '@nestjs/common';
import { UsersModule } from 'src/user/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
})
export class AuthModule {}
