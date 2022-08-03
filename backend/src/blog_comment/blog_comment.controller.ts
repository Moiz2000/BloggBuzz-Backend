import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CommentsService } from './blog_comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller()
export class CommentsController {
    constructor(private commentsService:CommentsService){}


    @Get('blog/:blogId/comments')
    getBlogComment(@Param('blogId',ParseIntPipe) blogId:number){
        return this.commentsService.fetchBlogComment(blogId);
    }

    @Post('user/:userId/blog/:blogId/comment')
    postComment(@Body() createCommentDto:CreateCommentDto,@Param('userId',ParseIntPipe) userId:number,@Param('blogId',ParseIntPipe) blogId:number){
        createCommentDto.blogId=blogId;
        createCommentDto.userId=userId;
        return this.commentsService.WriteComment(createCommentDto);
    }
    // @Patch('user/:userId/blog/:blogId/comment/:id')
    // updating(@Body() updateCommentDto:UpdateCommentDto,@Param('userId',ParseIntPipe) userId:number,@Param('blogId',ParseIntPipe) blogId:number){
    //     return this.commentsService.UpdateComment(updateCommentDto);
    // }
    @Delete('user/:userId/blog/:blogId/comment/:id')
    deleting(@Body() deleteCommentDto:DeleteCommentDto,@Param('userId',ParseIntPipe) userId:number,@Param('blogId',ParseIntPipe) blogId:number){
        return this.commentsService.DeleteComment(deleteCommentDto);
    }
}
