import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog_Tags } from './entity/blog_tags.entity';

@Injectable()
export class BlogTagsService {
    constructor(
        @InjectRepository(Blog_Tags)
        private blogTagsRepository:Repository<Blog_Tags>
    ){}

    getAll(blogId:number):Promise<Blog_Tags[]>
    {
        return this.blogTagsRepository.find({relations:{blog:true},where:{blog:{id:blogId}}});
    }
    createBlogTag(){

    }
    updateBlogTag(){

    }
    deleteBlogTag(){

    }
}
