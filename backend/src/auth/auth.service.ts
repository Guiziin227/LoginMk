import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(dto: LoginDto) {
    const { email, password } = await this.userService.findByEmail({
      email: dto.email,
    });

    const userExists = await this.userService.findByEmail({ email });
    if (!userExists) {
      throw new UnauthorizedException('Crendinciais inválidas.');
    }

    const passwordMatches = bcrypt.compareSync(dto.password, password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Crendinciais inválidas.');
    }

    return { message: 'Login bem-sucedido.' };
  }

  async register(dto: CreateUserDto) {
    const newUser = await this.userService.create(dto);
    return newUser;
  }
}
