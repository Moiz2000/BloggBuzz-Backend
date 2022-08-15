import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { DeleteLikeDto } from './dto/delete-like.dto';
import { Blog_Like } from './entity/blog_like.entity';

@Injectable()
export class BlogLikeService {
    constructor(
        @InjectRepository(Blog_Like)
        private blogLikeRepository:Repository<Blog_Like>
    ){}

    AddLike(createLikeDto:CreateLikeDto){
        return this.blogLikeRepository.save(createLikeDto);
    }
    GetLikesOfBlogs(blogId:number){
        return this.blogLikeRepository.query('SELECT * FROM BLOG_LIKE WHERE blogId='+blogId+'')
    }
    GetLikesCount(blogId:number){
        return this.blogLikeRepository.createQueryBuilder('blog_like').select('blogId').addSelect("COUNT(blog_like.blogId)","COUNT")
        .groupBy('blog_like.blogId').having("blog_like.blogId=:BLOGID",{BLOGID:blogId}).getRawMany();
    }
    DeleteLike(deleteLikeDto:DeleteLikeDto){
        return this.blogLikeRepository.delete(deleteLikeDto);
    }
    // GetLikesWithUser(blogId:number,userId:number){
    //     return this.blogLikeRepository.findOne({relations:{user:true,blog:true},where:{blog:{id:blogId},user:{id:userId}}})
    // }
}
