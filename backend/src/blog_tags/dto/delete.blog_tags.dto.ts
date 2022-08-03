import { IsInt } from "class-validator";
import { Blog } from "src/blog/entity/blog.entity";
import { Tag } from "src/tag/entity/tag.entity";

export class DeleteBlogTagsDto{
    
    tag:Tag

    blog:Blog
}