import { Blog } from "src/blog/entity/blog.entity";
// import { Blog_Tags } from "src/blog_tags/entity/blog_tags.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Blog, (blog) => blog.tag, { cascade: true })
    blog: Blog[]

    // @ManyToMany(()=> Blog, blogs=>blogs.tags,{onDelete:"CASCADE"})
    // // @JoinTable()
    // blogs:Blog[]
}  