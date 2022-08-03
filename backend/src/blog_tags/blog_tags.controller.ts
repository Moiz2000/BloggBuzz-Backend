import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BlogTagsService } from './blog_tags.service';

@Controller()
export class BlogTagsController {
    constructor(private blogTagsServices:BlogTagsService){}

    @Get('blog/:blogId/blogtag')
    gettags(@Param('blogId',ParseIntPipe) blogId:number){
        return this.blogTagsServices.getAll(blogId);
    }

    // @Post('blog/')

}
