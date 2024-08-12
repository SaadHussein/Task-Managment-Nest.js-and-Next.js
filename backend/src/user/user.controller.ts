import { Body, Controller, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto, @Req() req: Request) {
    console.log(req.headers['user-agent']);
    const userAgent = req.headers['user-agent'];
    return this.userService.registerUser(registerUserDto, userAgent);
  }
}
