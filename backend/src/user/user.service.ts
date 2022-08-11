import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService:JwtService,
  ) {}

  get(): Promise<User[]> {
    return this.userRepository.find();
  }

  create(createUserDto: CreateUserDto):Promise<User> {
    return this.userRepository.save(createUserDto);
  }
  update(updateUserDto: UpdateUserDto, userId: number) {
    return this.userRepository.update(userId, updateUserDto);
  }

  show(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  delete(userId: number) {
    return this.userRepository.delete(userId);
  }


  async login(user: any) {
    const payload = { email:user.email};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email:string,password:string){
    const userdata= await this.findByEmail(email)
    if(userdata && userdata.password===password){
      return userdata;
    }
    return null;
  }
}