import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwtService:JwtService){}
    async validateUser(email:string,password:string){
        const userdata= await this.userService.findByEmail(email)
        if(userdata && userdata.password===password){
          return userdata;
        }
        return null;
    }
    async login(user: any) {
        const payload = { username: user.username, email:user.email, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}
