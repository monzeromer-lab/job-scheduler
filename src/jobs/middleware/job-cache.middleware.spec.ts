import { JobCacheMiddleware } from './job-cache.middleware';

describe('JobCacheMiddleware', () => {
  it('should be defined', () => {
    expect(new JobCacheMiddleware()).toBeDefined();
  });
});
