import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { JobsService } from '../services/jobs.service';

@Injectable()
export class JobsCacheMiddleware implements NestMiddleware {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly jobsService: JobsService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { page, limit } = req.query as unknown as {
      page: number;
      limit: number;
    };

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
