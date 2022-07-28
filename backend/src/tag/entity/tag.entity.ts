import { Blog } from "src/blog/entity/blog.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @ManyToMany(()=> Blog, blogs=>blogs.tags,{onDelete:"CASCADE"})
    // @JoinTable()
    blogs:Blog[]
}  