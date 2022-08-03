import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogLikeController } from './blog_like.controller';
import { BlogLikeService } from './blog_like.service';
import { Blog_Like } from './entity/blog_like.entity';

@Module({
  controllers: [BlogLikeController],
  providers: [BlogLikeService],
  imports: [TypeOrmModule.forFeature([Blog_Like])],
})
export class BlogLikeModule {}
