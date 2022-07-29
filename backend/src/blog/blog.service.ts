import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto} from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entity/blog.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private blogRepository:Repository<Blog>
    ){}


    get():Promise<Blog[]>{
        return this.blogRepository.find();
    }
    getbyId(Blog_ID:number){
        return this.blogRepository.findOne({where:{Blog_ID:Blog_ID}});
    }
    // getUsersblog(userId:number){
    //     return this.blogRepository.findOne({where:{userId:userId}});
    // }
    createblog(createBlogDto:CreateBlogDto, userId:number){
        return this.blogRepository.save(createBlogDto);
    }
    delete(param:{userId:number,Blog_ID:number}){
        return this.blogRepository.delete(param);
    }
    update(updateBlogDto:UpdateBlogDto, param:{userId:number,Blog_ID:number}){
        return this.blogRepository.update(param,updateBlogDto);
    }
}
