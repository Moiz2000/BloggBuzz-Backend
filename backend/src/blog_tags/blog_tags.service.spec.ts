import { Test, TestingModule } from '@nestjs/testing';
import { BlogTagsService } from './blog_tags.service';

describe('BlogTagsService', () => {
  let service: BlogTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogTagsService],
    }).compile();

    service = module.get<BlogTagsService>(BlogTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
