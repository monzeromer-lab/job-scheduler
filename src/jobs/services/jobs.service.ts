import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateJobDto } from '../dto/create-job.dto';
import { JobEntity } from '../entities/job.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkersService } from './workers.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobEntity)
    private jobsRepository: Repository<JobEntity>,
    private dataSource: DataSource,
    private readonly workersService: WorkersService,
    private EntityManager: EntityManager,
  ) {}

  async create(createJobDto: CreateJobDto[]): Promise<JobEntity[]> {
    let Jobs: JobEntity[] = [];

    await this.dataSource.manager
      .transaction(async (transactionalEntityManager) => {
        const jobs = createJobDto.map((job) => {
          return this.EntityManager.create(JobEntity, job);
        });
        await transactionalEntityManager.save(jobs);
        Jobs = jobs;
        jobs.forEach(async (job) => {
          await this.workersService.addCronJob(
            job.name,
            job.id,
            job.endpoint,
            job.payload,
            job.cronExpression,
          );
        });
      })
      .catch((e) => {
        if ((e.code = 'QueryFailedError')) {
          throw new ConflictException();
        }
        throw new InternalServerErrorException();
      });
    return Jobs;
  }

  async findAll(page: number, limit: number): Promise<JobEntity[]> {
    return await this.jobsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: string): Promise<JobEntity | null> {
    return await this.jobsRepository.findOneBy({ id });
  }
}
