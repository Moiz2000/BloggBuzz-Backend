import { Blog } from "src/blog/entity/blog.entity";
import { Tag } from "src/tag/entity/tag.entity";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Blog_Tags{

    @PrimaryColumn({type:"int", name: 'blogId'})
    @ManyToOne(()=> Blog, (blog)=>blog.blog_tags,{onDelete:"CASCADE"})
    blog:Blog;

    @PrimaryColumn({type:"int", name: 'tagId'})
    @ManyToOne(()=>Tag, (tag)=>tag.blog_tags,{onDelete:"CASCADE"})
    tag:Tag;    
}