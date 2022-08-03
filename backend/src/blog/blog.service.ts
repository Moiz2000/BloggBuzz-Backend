import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { createQuery } from 'mysql2/typings/mysql/lib/Connection';
import { Repository } from 'typeorm';
import { CreateBlogDto} from './dto/create-blog.dto';
import { DeleteBlogDto } from './dto/delete-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entity/blog.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private blogRepository:Repository<Blog>
    ){}


    get():Promise<Blog[]>{
        return this.blogRepository.find({relations:{blog_comments:true}});
    }
    getbyId(Blog_ID:number){
        return this.blogRepository.findOne({where:{id:Blog_ID}});
    }
    getUsersblog(userId:number){
        return this.blogRepository.find({relations:{user:true},where:{user:{id:userId}}});
    }
    createblog(createBlogDto:CreateBlogDto){
        return this.blogRepository.save(createBlogDto);
    }
    // delete(deleteBlogDto:DeleteBlogDto){
    //     return this.blogRepository.delete(deleteBlogDto);
    // }
    delete(deleteBlogDto:DeleteBlogDto){
        return this.blogRepository.delete(deleteBlogDto);
    }
    update(updateBlogDto:UpdateBlogDto, Blog_ID:number){
        
        return this.blogRepository.update(Blog_ID,updateBlogDto);
    }
}
