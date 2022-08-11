import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
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

    @Post('blog/:blogId/blogtag/:tagId')
    async createTag(@Body() createBlogTagDto:CreateBlogTagsDto, @Param('blogId', ParseIntPipe) blogId:number,  @Param('tagId', ParseIntPipe) tagId:number){
        createBlogTagDto.blog=await this.blogService.getbyId(blogId);
        createBlogTagDto.tag=await this.tagService.getById(tagId);
        return this.blogTagsServices.createBlogTag(createBlogTagDto);
    }

    // @Patch('blog/:blogId/blogtag/:tagId')
    // updateTagging(@Body() updateBlogTagDto:UpdateBlogTagsDto, @Param('blogId', ParseIntPipe) blogId:number,  @Param('tagId', ParseIntPipe) tagId:number){
    //     return this.blogTagsServices.updateBlogTag(blogId,tagId);
    // }

    @Delete('blog/:blogId/blogtag/:tagId')
    async deleteTag(@Body() deleteBlogTagDto:DeleteBlogTagsDto, @Param('blogId', ParseIntPipe) blogId:number,  @Param('tagId', ParseIntPipe) tagId:number){
        deleteBlogTagDto.blog=await this.blogService.getbyId(blogId);
        deleteBlogTagDto.tag=await this.tagService.getById(tagId);
        return this.blogTagsServices.deleteBlogTag(deleteBlogTagDto)
    }

}
