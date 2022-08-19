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
import { ProfileModule } from './profile/profile.module';
// import { BlogTagsModule } from './blog_tags/blog_tags.module';
// import { Blog_Tags } from './blog_tags/entity/blog_tags.entity';
import { JwtModule } from '@nestjs/jwt';
// import { ImageModule } from './blog_image/blog_image.module';
// import { Image } from './blog_image/entity/blog_image.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'us-cdbr-east-06.cleardb.net',
    port: 3306,
    username: 'b6a116c27552b4',
    password: '3e3260d6',
    database: 'heroku_4f227380ec7b2bd',
    entities: [User, Blog, Tag, Blog_Like, Blog_Comment],
    synchronize: true,
  }), BlogModule, TagModule, BlogLikeModule, CommentsModule, ProfileModule, JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

// mysql://b511eef04d65d6:b51a6754@us-cdbr-east-06.cleardb.net/heroku_f8f6ea7d313f791?reconnect=true
//mysql://b6a116c27552b4:3e3260d6@us-cdbr-east-06.cleardb.net/heroku_4f227380ec7b2bd?reconnect=true