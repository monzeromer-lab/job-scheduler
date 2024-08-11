import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import * as axios from 'axios';
import { JobEntity, JobStatus } from '../entities/job.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { parseExpression } from 'cron-parser';

@Injectable()
export class WorkersService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @InjectRepository(JobEntity)
    private jobsRepository: Repository<JobEntity>,
  ) {}

  async addCronJob(
    name: string,
    id: string,
    endpoint: string,
    payload: string,
    cronExpression: string,
  ) {
    const job = new CronJob(cronExpression, async () => {
      await this.jobsRepository.update(id, { status: JobStatus.RUNNING, lastRun:  new Date(), nextRun: parseExpression(cronExpression).next()});
      await axios.default
        .post(endpoint, payload)
        .then(async (res) => {
          await this.jobsRepository.update(id, { status: JobStatus.SUCCESS });
          Logger.log(`CronJob [${name}] Success!`);
        })
        .catch(async (e) => {
          await this.jobsRepository.update(id, { status: JobStatus.FAILED });
          Logger.log(`CronJob [${name}] Faild!`);
        });
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();
    Logger.warn(`CronJob [${name}] started!`);
  }
}
