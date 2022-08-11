import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { AuthenticationMiddleware } from './user/authentication.middleware';
import { BlogController } from './blog/blog.controller';
import { BlogLikeController } from './blog_like/blog_like.controller';
import { CommentsController } from './blog_comment/blog_comment.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user/user.controller';
import { TagController } from './tag/tag.controller';

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
  }), BlogModule, TagModule, BlogLikeModule, CommentsModule, AuthModule, ProfileModule, BlogTagsModule,JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(AuthenticationMiddleware).exclude(
      {path:'blog',method:RequestMethod.GET},
      {path:'blog/:Blog_ID', method:RequestMethod.GET},
      {path:'user/SignUp', method:RequestMethod.POST},
      {path:'user/signin', method:RequestMethod.POST},
      {path:'blog/:blogId/comment', method:RequestMethod.GET},
      {path:'blog/:blogId/blog_like', method:RequestMethod.GET},
      {path:'blog/:blogId/blog_likeCount', method:RequestMethod.GET},
      {path:'blog/blogtag/:blogId', method:RequestMethod.GET},
      {path:'tag', method:RequestMethod.GET},
      {path:'tag/:tagId', method:RequestMethod.GET},
      {path:'tag/:tagName', method:RequestMethod.GET},
    ).forRoutes(UserController,BlogController,BlogLikeController,BlogTagsController,CommentsController,TagController);
  }
}
