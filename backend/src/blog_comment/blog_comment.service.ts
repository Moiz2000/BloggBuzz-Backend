import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Blog_Comment } from './entity/blog_comment.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Blog_Comment)
        private commentRepository:Repository<Blog_Comment>
    ){}

    fetchBlogComment(blogId:number):Promise<Blog_Comment[]>
    {
        return this.commentRepository.query('SELECT * FROM BLOG_COMMENT WHERE blogId='+blogId+'');
    }
    WriteComment(createCommentDto:CreateCommentDto){
        return this.commentRepository.save(createCommentDto);
    }
    getbyId(id:number){
        return this.commentRepository.findOne({relations:{blog:true,user:true},where:{id:id}});
    }
    // UpdateComment(updateCommentDto:UpdateCommentDto){
    //     return this.commentRepository.update(updateCommentDto);
    // }
    getForComment(id:number){
        return this.commentRepository.findOne({where:{id:id}});
    }
    DeleteComment(deleteCommentDto:DeleteCommentDto){
        return this.commentRepository.delete(deleteCommentDto);
    }
}
