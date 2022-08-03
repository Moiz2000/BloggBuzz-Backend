import { Blog } from "src/blog/entity/blog.entity";
import { Tag } from "src/tag/entity/tag.entity";

export class UpdateBlogTagsDto{

    tag:Tag;

    blog:Blog;
}