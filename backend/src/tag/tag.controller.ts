import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './tag.service';

@Controller()
export class TagController {
    constructor(private tagService:TagService){}

    @Get('tag')
    getAll(){
        return this.tagService.getAll();
    }
    @Get('tag/:tagId')
    getusingId(@Param('tagId', ParseIntPipe) tagId:number)
    {
        return this.tagService.getById(tagId);
    }
    @Get('tag/tagName')
    getusingName(@Param('tagName', ParseUUIDPipe) tagName:string)
    {
        return this.tagService.getByName(tagName);
    }
    @Post('tag/createTag')
    WriteTag(@Body() createTagDto:CreateTagDto){
        return this.tagService.createTag(createTagDto);
    }
}
