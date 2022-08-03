import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BlogService } from 'src/blog/blog.service';
import { UserService } from 'src/user/user.service';
import { BlogLikeService } from './blog_like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { DeleteLikeDto } from './dto/delete-like.dto';
import { Blog_Like } from './entity/blog_like.entity';

@Controller()
export class BlogLikeController {
    constructor(
        private blogLikeService:BlogLikeService,
        private blogService:BlogService,
        private userService:UserService,
        ){}
    @Get('blog/:blogId/blog_like')
    getLikes(@Param('blogId',ParseIntPipe) blogId:number)
    {
        return this.blogLikeService.GetLikesOfBlogs(blogId)
    }

    @Get('blog/:blogId/blog_likeCount')
    getCountOfBlogLikes(@Param('blogId',ParseIntPipe) blogId:number){
        return this.blogLikeService.GetLikesCount(blogId)
    }
    @Post('user/:userId/blog/:blogId/blog_like')
    async LikeBlog(@Body() createLikeDto:CreateLikeDto,@Param('userId',ParseIntPipe) userId:number,@Param('blogId',ParseIntPipe) blogId:number){
        createLikeDto.blog=await this.blogService.getbyId(blogId);
        createLikeDto.user=await this.userService.show(userId);
        createLikeDto.Like_Status=true;
        return this.blogLikeService.AddLike(createLikeDto);
    }
    @Delete('user/:userId/blog/:blogId/blog_like')
    async UnlikeBlog(@Body() deleteLikeDto:DeleteLikeDto, @Param('userId',ParseIntPipe) userId:number,@Param('blogId',ParseIntPipe) blogId:number){
        deleteLikeDto.blog=await this.blogService.getbyId(blogId);
        deleteLikeDto.user=await this.userService.show(userId);
        return this.blogLikeService.DeleteLike(deleteLikeDto);
    }
}

