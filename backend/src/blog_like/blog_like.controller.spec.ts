import { Test, TestingModule } from '@nestjs/testing';
import { BlogLikeController } from './blog_like.controller';

describe('BlogLikeController', () => {
  let controller: BlogLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogLikeController],
    }).compile();

    controller = module.get<BlogLikeController>(BlogLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
