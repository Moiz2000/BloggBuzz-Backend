import { Test, TestingModule } from '@nestjs/testing';
import { BlogLikeService } from './blog_like.service';

describe('BlogLikeService', () => {
  let service: BlogLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogLikeService],
    }).compile();

    service = module.get<BlogLikeService>(BlogLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
