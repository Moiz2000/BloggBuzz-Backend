import { TagService } from './../tag/tag.service';
import { UserService } from 'src/user/user.service';
import { User } from './../user/entity/user.entity';
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto} from './dto/create-blog.dto';
import { DeleteBlogDto } from './dto/delete-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entity/blog.entity';
import { json } from 'stream/consumers';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private blogRepository:Repository<Blog>,
        private userService:UserService,
        private tagServices:TagService,
    ){}


    async get(req:any):Promise<Blog[]>{
        const name=req.query.user;
        const tagName=req.query.cat;
        if(name){
            const user=await this.userService.findByUsername(name);
            const Id=user.id;
            return this.blogRepository.query('SELECT USER.name,USER.id AS UserId,BLOG.* FROM BLOG INNER JOIN USER ON USER.id=BLOG.userId WHERE USER.id='+Id+' ORDER BY BLOG.id DESC')
        }
        else if(tagName){
            const cat=await this.tagServices.getByName(tagName);
            const Id=cat.id;
            return this.blogRepository.query('SELECT blog.* FROM tag INNER JOIN blog_tags on tag.id=blog_tags.tagId INNER JOIN blog on blog_tags.blogId=blog.id WHERE tag.id='+Id+' ORDER BY BLOG.id DESC')
        }
        else{
            return this.blogRepository.find({order:{id:"DESC"}});
        }
    }
    getbyId(Blog_ID:number){
        const blog=this.blogRepository.query('SELECT BLOG.*,USER.name FROM BLOG INNER JOIN USER ON USER.id=BLOG.userId WHERE BLOG.id='+Blog_ID+'')
        return blog;
        // return this.blogRepository.findOne({relations:{blog_comments:true,user:true},where:{id:Blog_ID}});
    }
    getForComment(Blog_id:number){
        return this.blogRepository.findOne({where:{id:Blog_id}})
    }
    getUsersblog(userId:number){
        return this.blogRepository.find({relations:{user:true},where:{user:{id:userId}}});
    }
    createblog(createBlogDto:CreateBlogDto){
        return this.blogRepository.save(createBlogDto);
    }

    delete(Blog_ID:number){
        return this.blogRepository.delete(Blog_ID);
    }
    update(updateBlogDto:UpdateBlogDto, Blog_ID:number){
        return this.blogRepository.update(Blog_ID,updateBlogDto);
    }
}
