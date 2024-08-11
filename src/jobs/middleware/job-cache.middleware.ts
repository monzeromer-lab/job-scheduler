import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { GetJobsQueryDto } from '../dto/find-job.dto';
import { Request, Response } from 'express';
import { JobsService } from '../services/jobs.service';

@Injectable()
export class JobsCacheMiddleware implements NestMiddleware {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly jobsService: JobsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    Logger.log('mid')
    const { page, limit } = req.query as unknown as GetJobsQueryDto;

    const cacheKey = `JOBS:${page}-${limit}`;

    const cachedJobs = await this.cacheManager.get(cacheKey);

    if (cachedJobs) {
      Logger.log('Jobs fetched from cache');
      res.json(cachedJobs);
      return;
    }

    const jobs = await this.jobsService.findAll(page, limit);
    await this.cacheManager.set(cacheKey, jobs, 5000);

    res.json(jobs);
    next();
  }
}
