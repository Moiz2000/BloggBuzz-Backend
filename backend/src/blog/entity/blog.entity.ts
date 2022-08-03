import { max } from "class-validator";
import { Blog_Like } from "src/blog_like/entity/blog_like.entity";
import { Blog_Comment } from "src/blog_comment/entity/blog_comment.entity";
import { Tag } from "src/tag/entity/tag.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Blog_Tags } from "src/blog_tags/entity/blog_tags.entity";

@Entity()
export class Blog{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>User, (user)=>user.blogs,{nullable:true, onDelete:"CASCADE"})
    // @JoinColumn()
    user:User

    @Column()
    Title: string;

    @Column({type: "longtext"})
    Text: string;

    @CreateDateColumn()
    // @Column({ type: 'timestamptz', nullable: true })
    Create_Time: Date;

    @UpdateDateColumn({nullable:true})
    Update_Time: Date;

    // @ManyToMany(()=>Tag, (tags)=>tags.blogs,{cascade:true,onDelete:"CASCADE"} )
    // @JoinTable()
    // tags:Tag[];

    @OneToMany(()=>Blog_Tags, (blog_tags)=>blog_tags.blog, {cascade:true})
    blog_tags:Blog_Tags[];

    @OneToMany(()=>Blog_Like, (blog_likes)=>blog_likes.blog,{cascade:true})
    blog_likes:Blog_Like[];

    @OneToMany(()=>Blog_Comment, (blog_comments)=>blog_comments.blog,{cascade:true})
    blog_comments:Comment[];
}