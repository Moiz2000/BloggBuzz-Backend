import { IsBoolean, IsNumber } from "class-validator";
import { Blog } from "src/blog/entity/blog.entity";
import { User } from "src/user/entity/user.entity";

export class CreateLikeDto{
    user:User;

    blog:Blog;

    // @IsBoolean()
    Like_Status:boolean;
}