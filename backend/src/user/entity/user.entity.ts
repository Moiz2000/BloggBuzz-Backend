import { Blog } from 'src/blog/entity/blog.entity';
import { Blog_Like } from 'src/blog_like/entity/blog_like.entity';
import { Blog_Comment } from 'src/blog_comment/entity/blog_comment.entity';
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

  @OneToMany(()=>Blog ,(blog)=>blog.user,{cascade:true})
  blogs:Blog[];

  @OneToMany(()=>Blog_Like, (blog_likes)=>blog_likes.user,{cascade:true})
  blog_likes:Blog_Like[];

  @OneToMany(()=>Blog_Comment, (blog_comments)=>blog_comments.user,{cascade:true})
  blog_comments:Comment[];
}