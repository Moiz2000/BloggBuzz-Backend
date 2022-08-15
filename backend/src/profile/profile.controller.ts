import { UserService } from 'src/user/user.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
    constructor(
        private userService:UserService,
    ){

    }
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async Profile(@Req() req:any)
    {
        req.user=await this.userService.getTokenUser(req);
        return req.user;
        // const token = req.headers.authorization.split(' ')[1];
        // const decoded=this.jwtService.verify(token)
        // console.log(decoded.email);
        // const user=await this.userService.findByEmail(decoded.email);
        // req.user=user;
        // return req.user;
    }
}
