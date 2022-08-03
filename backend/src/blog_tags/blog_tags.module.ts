import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTagsController } from './blog_tags.controller';
import { BlogTagsService } from './blog_tags.service';
import { Blog_Tags } from './entity/blog_tags.entity';

@Module({
    controllers:[BlogTagsController],
    providers:[BlogTagsService],
    imports:[TypeOrmModule.forFeature([Blog_Tags])],
})
export class BlogTagsModule {}
