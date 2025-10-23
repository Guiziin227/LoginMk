import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('login body:', loginDto);
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    console.log('New user created:', userDto);
    return this.authService.register(userDto);
  }
}
