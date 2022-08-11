import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogTagsDto } from './dto/create-blog_tags.dto';
import { DeleteBlogTagsDto } from './dto/delete.blog_tags.dto';
import { UpdateBlogTagsDto } from './dto/update-blog_tags.dto';
import { Blog_Tags } from './entity/blog_tags.entity';

@Injectable()
export class BlogTagsService {
    constructor(
        @InjectRepository(Blog_Tags)
        private blogTagsRepository:Repository<Blog_Tags>
    ){}

    getAll(blogId:number):Promise<Blog_Tags[]>
    {
        return this.blogTagsRepository.query('SELECT TAG.name FROM TAG INNER JOIN BLOG_TAGS ON TAG.id=BLOG_TAGS.tagId WHERE blogId='+blogId+'')
        //return this.blogTagsRepository.find({relations:{blog:true,tag:true}})
        // return this.blogTagsRepository.find({relations:{blog:true},where:{blog:{id:blogId}}});
    }
    createBlogTag(createBlogTagDto:CreateBlogTagsDto){
        return this.blogTagsRepository.save(createBlogTagDto);
    }
    // updateBlogTag(blogId:number,tagId:number){
    //     return this.blogTagsRepository.update(blogId,tagId);
    // }
    deleteBlogTag(deleteBlogTagDto:DeleteBlogTagsDto){
        return this.blogTagsRepository.delete(deleteBlogTagDto);

    }
}
