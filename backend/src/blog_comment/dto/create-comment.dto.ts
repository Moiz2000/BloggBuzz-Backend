import { IsString } from "class-validator";
import { Blog } from "src/blog/entity/blog.entity";
import { User } from "src/user/entity/user.entity";
import { Blog_Comment } from "../entity/blog_comment.entity";

export class CreateCommentDto {
    user: User;

    blog: Blog;

    @IsString()
    Text: string;

    // blog_comment:Blog_Comment;
}