import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'express';
//import { response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService,
    private jwtService:JwtService,) {}

  @Get()
  getUsers() {
    return this.userService.get();
  }

  @Post('/SignUp')
  async store(@Body() createUserDto: CreateUserDto, @Res() res) {
    const newUser=await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({newUser}); //for created 201 is used
  }
  @UseGuards(AuthGuard('local'))
  @Post('/signin')
    async SignIn(@Res() response, @Body() user: User) {
        const token = await this.userService.login(user);
        return response.status(HttpStatus.OK).json(token)
  }
  @Patch('/:userId')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userService.update(updateUserDto, userId);
  }

  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.show(userId);
  }

  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.delete(userId);
  }
}