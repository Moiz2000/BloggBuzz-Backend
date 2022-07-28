import { Blog } from 'src/blog/entity/blog.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(()=>Blog ,(blogs)=>blogs.user,{cascade:true})
  blogs:Blog[];
}