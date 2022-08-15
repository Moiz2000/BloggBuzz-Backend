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
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
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
        const token = await this.userService.login(user,this.jwtService);
        return response.status(HttpStatus.OK).json(token)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async update(@Req() req:any,
    @Body() updateUserDto: UpdateUserDto) {
    req.user=await this.userService.getTokenUser(req);
    const userId=req.user.id;
    //console.log(userId);
    return this.userService.update(updateUserDto, userId);
  }

  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.show(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteUser(@Req() req:any){
      req.user=await this.userService.getTokenUser(req);
      const userId=req.user.id;
      return this.userService.delete(userId);
  }
}