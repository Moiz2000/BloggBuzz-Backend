import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { BlogModule } from './blog/blog.module';
import { Blog } from './blog/entity/blog.entity';
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/entity/tag.entity';
import { BlogLikeModule } from './blog_like/blog_like.module';
import { Blog_Like } from './blog_like/entity/blog_like.entity';
import { CommentsModule } from './blog_comment/blog_comment.module';
import { Blog_Comment } from './blog_comment/entity/blog_comment.entity';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { BlogTagsController } from './blog_tags/blog_tags.controller';
import { BlogTagsService } from './blog_tags/blog_tags.service';
import { BlogTagsModule } from './blog_tags/blog_tags.module';
import { Blog_Tags } from './blog_tags/entity/blog_tags.entity';

@Module({
  imports: [UserModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'blogbuzzdb',
    entities: [User,Blog,Tag,Blog_Like,Blog_Comment,Blog_Tags],
    synchronize: true,
  }), BlogModule, TagModule, BlogLikeModule, CommentsModule, AuthModule, ProfileModule, BlogTagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
