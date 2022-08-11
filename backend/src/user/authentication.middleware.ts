import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
interface UserRequset extends Request{
    user:any
}
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware{
    constructor(
        private jwtService:JwtService,
        private userService:UserService,
    ){}
    async use(req: UserRequset, res: Response, next: NextFunction){
        try{
            if(req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')){
                const token = req.headers.authorization.split(' ')[1];
                const decoded = await this.jwtService.verify(token);
                const user = await this.userService.findByEmail(decoded.email)
                if(user){
                    req.user = user
                    next()
                } 
                else {
                    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
                    
                }
                }
                else{
                    throw new HttpException('No token found', HttpStatus.NOT_FOUND)
                }
            }
            catch{
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
            }
            
        }
    }