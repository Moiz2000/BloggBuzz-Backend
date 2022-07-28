import { max } from "class-validator";
import { Blog_Like } from "src/blog_like/entity/blog_like.entity";
import { Blog_Comment } from "src/blog_comment/entity/blog_comment.entity";
import { Tag } from "src/tag/entity/tag.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Blog{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>User, (user)=>user.blogs,{nullable:false, onDelete:"CASCADE"})
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

    @ManyToMany(()=>Tag, (tags)=>tags.blogs,{cascade:true,onDelete:"CASCADE"} )
    @JoinTable()
    tags:Tag[];

    @OneToMany(()=>Blog_Like, (blog_likes)=>blog_likes.blog,{cascade:true})
    blog_likes:Blog_Like[];

    @OneToMany(()=>Blog_Comment, (blog_comments)=>blog_comments.blog,{cascade:true})
    blog_comments:Comment[];
}