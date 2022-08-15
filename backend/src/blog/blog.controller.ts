import { AuthGuard } from '@nestjs/passport';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, Request, Res } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller()
export class BlogController {
    constructor(
        private blogService: BlogService,
        private userService:UserService,
        ){}

    //constructor(private userService:UserService){}
    @Get('blog')
    getBlogs(@Request() req:any){
        return this.blogService.get(req)
    }
    @Get('blog/:Blog_ID')
    getblogId(@Param('Blog_ID', ParseIntPipe) Blog_ID:number){
        return this.blogService.getbyId(Blog_ID)
    }

    // @Get('user/blog')
    // getUserBlog(@Param('userId', ParseIntPipe) userId:number){
    //     return this.blogService.getUsersblog(userId)
    // }
    
    @UseGuards(AuthGuard('jwt'))
    @Post('user/blog')
    async Write(@Body() createBlogDto:CreateBlogDto, @Req() req:any,@Res() res){
        req.user=await this.userService.getTokenUser(req);
        
        try{
            createBlogDto.user=req.user;
            const blog=await this.blogService.createblog(createBlogDto);
            return res.status(HttpStatus.CREATED).json({blog})
        }
        catch(error){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Something went wrong");
        }
        
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('user/blog/:Blog_ID')
    async update(@Req() req:any,
                @Body() updateBlogDto:UpdateBlogDto,
                @Param('Blog_ID',ParseIntPipe) Blog_ID:number,
                @Res() response){
        req.user=await this.userService.getTokenUser(req);
        const blog=await this.blogService.getbyId(Blog_ID);
        console.log(JSON.stringify(blog));
        const user=req.user;
        // console.log(blog[0].name);
        // console.log(user.name);
        console.log(JSON.stringify(user))
        try{
            if(blog){
                if(user.id===blog[0].userId)
                try{
                    const updateBlog=this.blogService.update(updateBlogDto,Blog_ID)
                    return response.status(HttpStatus.OK).json("Blog is updated Successfully");
                }
                catch(err){
                    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Something went wrong");
                }
                else{
                    return response.status(HttpStatus.UNAUTHORIZED).json("You can't update other users' post");
                }
            }
        }
        catch(err){
            return response.status(HttpStatus.NOT_FOUND).json("Blog does not exist");
        }
        
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('user/blog/:Blog_ID')
    async delete(@Req() req:any,@Param('Blog_ID',ParseIntPipe) Blog_ID:number,@Res() response){
        //console.log(Blog_ID);
        req.user=await this.userService.getTokenUser(req);
        //console.log(req.user);
        const BLOG=await this.blogService.getbyId(Blog_ID);
        //console.log(BLOG);
        const user=req.user;
        console.log(JSON.stringify(BLOG));
        try{
            if(BLOG){
                if(user.id===BLOG[0].userId)
                {
                    try{
                        const deleted=this.blogService.delete(Blog_ID);
                        if(deleted){
                            return response.status(HttpStatus.OK).json("Blog is deleted Successfully")
                        }
                        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Something went wrong"); 
                    }
                    catch(err){
                        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Something went wrong"); 
                    }
                }
                else{
                    return response.status(HttpStatus.UNAUTHORIZED).json("You can't delete other users' post");
                }
            }
        }
        catch(err){
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Blog does not exist");
        }
        
    }
}
