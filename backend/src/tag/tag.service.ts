import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entity/tag.entity';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private tagRepository:Repository<Tag>
    ){}
    getAll():Promise<Tag[]>{
        return this.tagRepository.find()
    }
    getById(tagId:number){
        return this.tagRepository.findOne({where:{id:tagId}})
    }
    getByName(tagName:string){
        return this.tagRepository.findOne({where:{name:tagName}})
    }
    createTag(createTagDto:CreateTagDto){
        return this.tagRepository.save(createTagDto)
    }
}
