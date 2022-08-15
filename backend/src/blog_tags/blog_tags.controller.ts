import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, HttpStatus, Res } from '@nestjs/common';
import { BlogService } from 'src/blog/blog.service';
import { TagService } from 'src/tag/tag.service';
import { BlogTagsService } from './blog_tags.service';
import { CreateBlogTagsDto } from './dto/create-blog_tags.dto';
import { DeleteBlogTagsDto } from './dto/delete.blog_tags.dto';
import { UpdateBlogTagsDto } from './dto/update-blog_tags.dto';

@Controller()
export class BlogTagsController {
    constructor(
        private blogTagsServices:BlogTagsService,
        private blogService:BlogService,
        private tagService:TagService,
        ){}

    @Get('blog/blogtag/:blogId')
    gettags(@Param('blogId',ParseIntPipe) blogId:number){
        return this.blogTagsServices.getAll(blogId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('blog/:blogId/blogtag/:tagId')
    async createTag(@Body() createBlogTagDto:CreateBlogTagsDto, @Param('blogId', ParseIntPipe) blogId:number,
                    @Param('tagId', ParseIntPipe) tagId:number,@Req() req:any,@Res() response){
        try{
            createBlogTagDto.blog=await this.blogService.getForComment(blogId);
            createBlogTagDto.tag=await this.tagService.getById(tagId);
            const tag=await this.blogTagsServices.createBlogTag(createBlogTagDto);
            return response.status(HttpStatus.OK).json({tag})
        }
        catch(err){
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Something went wrong")
        }
    }

    // @Patch('blog/:blogId/blogtag/:tagId')
    // updateTagging(@Body() updateBlogTagDto:UpdateBlogTagsDto, @Param('blogId', ParseIntPipe) blogId:number,  @Param('tagId', ParseIntPipe) tagId:number){
    //     return this.blogTagsServices.updateBlogTag(blogId,tagId);
    // }

    @UseGuards(AuthGuard('jwt'))
    @Delete('blog/:blogId/blogtag/:tagId')
    async deleteTag(@Body() deleteBlogTagDto:DeleteBlogTagsDto, @Param('blogId', ParseIntPipe) blogId:number,  
                    @Param('tagId', ParseIntPipe) tagId:number,@Req() req:any,@Res() response){
                    try{
                        deleteBlogTagDto.blog=await this.blogService.getForComment(blogId);
                        deleteBlogTagDto.tag=await this.tagService.getById(tagId);
                        const deleted=await this.blogTagsServices.deleteBlogTag(deleteBlogTagDto);
                        return response.status(HttpStatus.OK).json("Action performed")
                    }
                    catch(err){
                        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Something went wrong");
                    }
    }

}
