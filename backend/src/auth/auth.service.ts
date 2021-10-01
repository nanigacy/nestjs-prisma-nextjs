import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.user({ username: username });
    // 👇 bcryptでハッシュ比較する
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }

    console.log('req.user:', req.user);

    // TODO: 👇 ユーザーの取得

    // TODO: 👇 ユーザーが存在しない場合、ユーザーの作成

    // TODO: 👇 JWTトークンを返す
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
