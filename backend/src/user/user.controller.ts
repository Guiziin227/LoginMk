import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: createUserDto) {
    return this.userService.create(createUserDto);
  }
}
