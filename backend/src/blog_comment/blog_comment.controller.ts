import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BlogService } from 'src/blog/blog.service';
import { CommentsService } from './blog_comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';

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

    @UseGuards(AuthGuard('jwt'))
    @Post('user/blog/:blogId/comment')
    async postComment(@Body() createCommentDto:CreateCommentDto,@Param('blogId',ParseIntPipe) blogId:number,@Req() req:any,@Res() response){
        const blog=await this.blogService.getForComment(blogId);
        req.user=await this.userService.getTokenUser(req);
        //createCommentDto.user=req.user;
        try{
            if(blog){
                try{
                    const user=req.user;
                    //console.log(user);
                    createCommentDto.blog=blog;
                    createCommentDto.user=user;
                    //console.log(createCommentDto);
                    const comment=await this.commentsService.WriteComment(createCommentDto);
                    return response.status(HttpStatus.OK).json({comment});
                }
                catch(err){
                    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Something went wrong");
                }
            }
        }
        catch(err){
            return response.status(HttpStatus.NOT_FOUND).json("Comment doesn't exist");
        }
    }
    // @Patch('user/:userId/blog/:blogId/comment/:id')
    // updating(@Body() updateCommentDto:UpdateCommentDto,@Param('userId',ParseIntPipe) userId:number,@Param('blogId',ParseIntPipe) blogId:number){
    //     return this.commentsService.UpdateComment(updateCommentDto);
    // }
    @UseGuards(AuthGuard('jwt'))
    @Delete('user/blog/:blogId/comment/:id')
    async deleting(@Body() deleteCommentDto:DeleteCommentDto,@Param('blogId',ParseIntPipe) blogId:number,
                    @Param('id',ParseIntPipe) id:number,
                    @Req() req:any,@Res() response){
        const blog=await this.blogService.getForComment(blogId);
        req.user=await this.userService.getTokenUser(req);
        const comment=await this.commentsService.getbyId(id)
        console.log(comment);
        try{
            if(comment){
                try{
                    if(comment.user.id===req.user.id && comment.blog.id===blog.id)
                    {
                        deleteCommentDto.blog=blog;
                        deleteCommentDto.user=req.user;
                        console.log("Result")
                        deleteCommentDto.id=id;
                        console.log(deleteCommentDto)
                        const deleted=await this.commentsService.DeleteComment(deleteCommentDto);
                        return response.status(HttpStatus.OK).json("Comment deleted");
                    }
                    else{
                        return response.status(HttpStatus.UNAUTHORIZED).json("You can't delele other users comment");
                    }
                   
                }
                catch(err){
                    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Something went wrong");
                }
             
            }

        }
        catch(err){
            return response.status(HttpStatus.NOT_FOUND).json("Something went wrong or comment doesn't exist")
        }
       
    }
}
