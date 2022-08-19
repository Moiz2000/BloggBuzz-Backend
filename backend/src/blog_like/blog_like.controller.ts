import { json } from 'stream/consumers';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, Res} from '@nestjs/common';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

    @Get('user/:userId/blog/:blogId')
    getUserLike(@Param('userId',ParseIntPipe) userId:number,@Param('blogId',ParseIntPipe) blogId:number)
    {
        return this.blogLikeService.GetLikesWithUser(userId,blogId)
    }
    @Get('blog/:blogId/blog_likeCount')
    getCountOfBlogLikes(@Param('blogId',ParseIntPipe) blogId:number){
        return this.blogLikeService.GetLikesCount(blogId)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('user/blog/:blogId/blog_like')
    async LikeBlog(@Body() createLikeDto:CreateLikeDto,@Req() req:any,@Param('blogId',ParseIntPipe) blogId:number,@Res() response){
        createLikeDto.blog=await this.blogService.getForComment(blogId);
        req.user=await this.userService.getTokenUser(req);
        try{
            createLikeDto.user=req.user;
            createLikeDto.Like_Status=true;
            const like=await this.blogLikeService.AddLike(createLikeDto);
            return response.status(HttpStatus.OK).json({like})
        }
        catch(err){
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Something went wrong");
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('user/blog/:blogId/blog_like')
    async UnlikeBlog(@Body() deleteLikeDto:DeleteLikeDto,@Req() req:any,@Param('blogId',ParseIntPipe) blogId:number,@Res() response){
        const blog=await this.blogService.getbyId(blogId);
        req.user=await this.userService.getTokenUser(req);
        try{
                deleteLikeDto.user=req.user;
                deleteLikeDto.blog=await this.blogService.getForComment(blogId)
                //console.log(deleteLikeDto);
                const deleted=await this.blogLikeService.DeleteLike(deleteLikeDto);
                return response.status(HttpStatus.OK).json("You have Unliked the blog");
        }
        catch(err){
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Something went wrong");
        }
    }
}

