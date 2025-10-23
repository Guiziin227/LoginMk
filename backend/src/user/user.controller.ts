import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Get()
  async findByEmail(@Body('email') email: string) {
    return this.userService.findByEmail({ email });
  }
}
