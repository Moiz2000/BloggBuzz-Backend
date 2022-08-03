import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from 'src/blog/blog.module';
import { UserModule } from 'src/user/user.module';
import { CommentsController } from './blog_comment.controller';
import { CommentsService } from './blog_comment.service';
import { Blog_Comment } from './entity/blog_comment.entity';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports:[UserModule,BlogModule,TypeOrmModule.forFeature([Blog_Comment])],
})
export class CommentsModule {}
