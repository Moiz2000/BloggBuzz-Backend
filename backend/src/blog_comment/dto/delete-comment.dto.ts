import { IsInt, IsString } from "class-validator";
import { Blog } from "src/blog/entity/blog.entity";
import { User } from "src/user/entity/user.entity";
import { Blog_Comment } from "../entity/blog_comment.entity";

export class DeleteCommentDto{
    user:User;

    blog:Blog;

    blog_comment:Blog_Comment;
}