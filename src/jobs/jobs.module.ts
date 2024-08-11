import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JobsService } from './services/jobs.service';
import { JobsController } from './controllers/jobs.controller';
import { JobsCacheMiddleware } from './middleware/job-cache.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from './entities/job.entity';
import { WorkersService } from './services/workers.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  controllers: [JobsController],
  providers: [JobsService, WorkersService],
})
export class JobsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JobsCacheMiddleware)
      .exclude('jobs/*')
      .forRoutes({ path: 'jobs', method: RequestMethod.GET });
  }
}
