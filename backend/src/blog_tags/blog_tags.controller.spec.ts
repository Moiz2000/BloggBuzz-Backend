import { Test, TestingModule } from '@nestjs/testing';
import { BlogTagsController } from './blog_tags.controller';

describe('BlogTagsController', () => {
  let controller: BlogTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogTagsController],
    }).compile();

    controller = module.get<BlogTagsController>(BlogTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
