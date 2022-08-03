import { IsInt, IsNumber } from "class-validator";
import { Blog } from "src/blog/entity/blog.entity";
import { User } from "src/user/entity/user.entity";

export class DeleteLikeDto{
    user:User;

    blog:Blog;

    // @IsBoolean()
    Like_Status:boolean;
}