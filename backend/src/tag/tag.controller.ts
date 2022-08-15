import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
    constructor(private tagService:TagService){}

    @Get()
    getAll(){
        return this.tagService.getAll();
    }
    @Get('/:tagId')
    getusingId(@Param('tagId', ParseIntPipe) tagId:number)
    {
        return this.tagService.getById(tagId);
    }
    @Get('/tagName')
    getusingName(@Param('tagName') tagName:string)
    {
        console.log(tagName);
        return this.tagService.getByName(tagName);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post()
    WriteTag(@Body() createTagDto:CreateTagDto){
        return this.tagService.createTag(createTagDto);
    }
}
