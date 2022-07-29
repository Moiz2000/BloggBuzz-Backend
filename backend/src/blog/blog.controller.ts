import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller()
export class BlogController {
    constructor(private blogService: BlogService){}
    @Get('blog')
    getBlogs(){
        return this.blogService.get()
    }
    @Get('blog/:Blog_ID')
    getblogId(@Param('Blog_ID', ParseIntPipe) Blog_ID:number){
        return this.blogService.getbyId(Blog_ID)
    }

    // @Get('user/:userId/blog')
    // getUserBlog(@Param('userId', ParseIntPipe) userId:number){
    //     return this.blogService.getUsersblog(userId)
    // }
    @Post('user/:userId/blog')
    Write(@Body() createBlogDto:CreateBlogDto, @Param('userId',ParseIntPipe) userId:number){
        return this.blogService.createblog(createBlogDto, userId)
    }
    @Patch('user/:userId/blog/:Blog_ID')
    update(@Body() updateBlogDto:UpdateBlogDto, @Param() param:{userId:number, Blog_ID:number}){
        return this.blogService.update(updateBlogDto,param)
    }

    @Delete('user/:userId/blog/:Blog_ID')
    delete(@Param() param:{userId:number,Blog_ID:number}){
        return this.blogService.delete(param)
    }
}
