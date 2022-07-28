import { Blog } from "src/blog/entity/blog.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Blog_Like{

    @PrimaryColumn({type:"int", name: 'userId'})
    @ManyToOne(()=>User, (user)=>user.blog_likes,{onDelete:"CASCADE"})
    user:User;

    @PrimaryColumn({type:"int", name: 'blogId'})
    @ManyToOne(()=> Blog, (blog)=>blog.blog_likes,{onDelete:"CASCADE"})
    blog:Blog;

    @Column()
    Like_Status: boolean;

}