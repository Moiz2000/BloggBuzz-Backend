import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './blog_comment.controller';
import { CommentsService } from './blog_comment.service';
import { Blog_Comment } from './entity/blog_comment.entity';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports:[TypeOrmModule.forFeature([Blog_Comment])],
})
export class CommentsModule {}
