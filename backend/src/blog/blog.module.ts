import { TagModule } from './../tag/tag.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './entity/blog.entity';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  exports:[BlogService],
  imports: [UserModule,TagModule,TypeOrmModule.forFeature([Blog])],
})
export class BlogModule {}
