import { Blog } from "src/blog/entity/blog.entity";
import { Blog_Tags } from "src/blog_tags/entity/blog_tags.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @OneToMany(()=>Blog_Tags, (blog_tag)=>blog_tag.tag, {cascade:true})
    blog_tags:Blog_Tags[];

    // @ManyToMany(()=> Blog, blogs=>blogs.tags,{onDelete:"CASCADE"})
    // // @JoinTable()
    // blogs:Blog[]
}  