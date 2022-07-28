import { Module } from '@nestjs/common';
import { BlogLikeController } from './blog_like.controller';
import { BlogLikeService } from './blog_like.service';

@Module({
  controllers: [BlogLikeController],
  providers: [BlogLikeService]
})
export class BlogLikeModule {}
