import { IsNumber } from "class-validator"
import { User } from "src/user/entity/user.entity";

export class DeleteBlogDto{
    // @IsNumber()
    user:User;

    // @IsNumber()
    id:number
}