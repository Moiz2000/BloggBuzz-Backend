import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BlogLikeService } from 'src/blog_like/blog_like.service';
import { UserService } from 'src/user/user.service';
import { BlogService } from 'src/blog/blog.service';
import { CommentsService } from './blog_comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller()
export class CommentsController {
    constructor(
        private commentsService:CommentsService,
        private userService:UserService,
        private blogService:BlogService,
        ){}


    @Get('blog/:blogId/comment')
    getBlogComment(@Param('blogId',ParseIntPipe) blogId:number){
        return this.commentsService.fetchBlogComment(blogId);
    }

    @Post('user/:userId/blog/:blogId/comment')
    async postComment(@Body() createCommentDto:CreateCommentDto,@Param('userId',ParseIntPipe) userId:number,@Param('blogId',ParseIntPipe) blogId:number){
        createCommentDto.blog=await this.blogService.getbyId(blogId);
        createCommentDto.user=await this.userService.show(userId);
        return this.commentsService.WriteComment(createCommentDto);
    }
    // @Patch('user/:userId/blog/:blogId/comment/:id')
    // updating(@Body() updateCommentDto:UpdateCommentDto,@Param('userId',ParseIntPipe) userId:number,@Param('blogId',ParseIntPipe) blogId:number){
    //     return this.commentsService.UpdateComment(updateCommentDto);
    // }
    @Delete('user/:userId/blog/:blogId/comment/:id')
    async deleting(@Body() deleteCommentDto:DeleteCommentDto,@Param('userId',ParseIntPipe) userId:number,@Param('blogId',ParseIntPipe) blogId:number){
        deleteCommentDto.blog=await this.blogService.getbyId(blogId);
        deleteCommentDto.user=await this.userService.show(userId);
        return this.commentsService.DeleteComment(deleteCommentDto);
    }
}
