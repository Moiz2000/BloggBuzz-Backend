import { Blog } from "src/blog/entity/blog.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Blog_Comment{
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({type:"int", name: 'blogId'})
    @ManyToOne(()=> Blog, (blog)=>blog.blog_comments,{onDelete:"CASCADE"})
    blog:Blog;

    @PrimaryColumn({type:"int", name: 'userId'})
    @ManyToOne(()=>User, (user)=>user.blog_comments,{onDelete:"CASCADE"})
    user:User;

    /*
    @ManyToOne((type) => Category, (category) => category.childCategories)
    parentCategory: Category

    @OneToMany((type) => Category, (category) => category.parentCategory)
    childCategories: Category[]*/

    @OneToMany(()=>Blog_Comment, (comment)=>comment.parent_comment,{cascade:true})
    child_comment:Blog_Comment[];

    @ManyToOne(()=>Blog_Comment, comment=>comment.child_comment,{onDelete:"CASCADE"})
    parent_comment:Blog_Comment;

    
    @Column()
    Text: string;

    @CreateDateColumn()
    Create_Time: Date;

    @UpdateDateColumn({nullable:true})
    Update_Time: Date;
}