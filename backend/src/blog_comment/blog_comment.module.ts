import { Module } from '@nestjs/common';
import { CommentsController } from './blog_comment.controller';
import { CommentsService } from './blog_comment.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
