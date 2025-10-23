import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail({
      email: dto.email,
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    const { password, ...userWithoutPassword } = user;
    void password;

    return {
      access_token: token,
      user: userWithoutPassword,
    };
  }

  async register(dto: CreateUserDto) {
    const newUser = await this.userService.create(dto);
    const { password, ...userWithoutPassword } = newUser;
    void password;

    return userWithoutPassword;
  }

  async validateUser(userId: number) {
    return this.userService.findById(userId);
  }
}
