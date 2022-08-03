import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BlogLikeService } from './blog_like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { DeleteLikeDto } from './dto/delete-like.dto';
import { Blog_Like } from './entity/blog_like.entity';

@Controller()
export class BlogLikeController {
    constructor(private blogLikeService:BlogLikeService){}
    @Get('blog/:blogId/blog_likes')
    getLikes(@Param('blogId',ParseIntPipe) blogId:number)
    {
        return this.blogLikeService.GetLikesOfBlogs(blogId)
    }

    @Get('blog/:blogId/blog_likesCount')
    getCountOfBlogLikes(@Param('blogId',ParseIntPipe) blogId:number){
        return this.blogLikeService.GetLikesCount(blogId)
    }
    @Post('user/:userId/blog/:blogId/blog_like')
    LikeBlog(@Body() createLikeDto:CreateLikeDto,@Param('userId',ParseIntPipe) userId:number,@Param('blogId',ParseIntPipe) blogId:number){
        createLikeDto.blogId=blogId;
        createLikeDto.userId=userId;
        createLikeDto.Like_Status=true;
        return this.blogLikeService.AddLike(createLikeDto);
    }
    @Delete('user/:userId/blog/:blogId/blog_unlike')
    UnlikeBlog(@Body() deleteLikeDto:DeleteLikeDto, @Param('userId',ParseIntPipe) userId:number,@Param('blogId',ParseIntPipe) blogId:number){
        // deleteLikeDto.blogId=blogId;
        // deleteLikeDto.userId=userId;
        return this.blogLikeService.DeleteLike(deleteLikeDto);
    }
}

