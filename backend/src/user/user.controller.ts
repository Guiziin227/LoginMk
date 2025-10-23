import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
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

  @Get('payment')
  async findExpiredUsers() {
    return this.userService.findExpiredPaidUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findByEmail(@Body('email') email: string) {
    return this.userService.findByEmail({ email });
  }

  @Put('payment')
  async updatePayment(
    @Body('id') id: number,
    @Body('is_paid') is_paid: boolean,
    @Body('paid_until') paid_until: Date,
  ) {
    return this.userService.updatePaymentStatus(id, is_paid, paid_until);
  }
}
