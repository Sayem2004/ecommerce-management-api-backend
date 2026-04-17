import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(email: string, password: string) {
  const dummyUser = {
      email: 'admin@gmail.com',
      password: await bcrypt.hash('Admin123', 10),
    };

    if (email !== dummyUser.email) {
      throw new UnauthorizedException('Invalid email');
    }

    const isMatch = await bcrypt.compare(password, dummyUser.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
   // JWT token generate
    const payload = { email };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: token,
    };
  }
}