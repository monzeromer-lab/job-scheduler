import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Version,
} from '@nestjs/common';
import { JobsService } from '../services/jobs.service';
import { CreateJobDto } from '../dto/create-job.dto';
import { FindJobs, GetOneJobQueryDto } from '../dto/find-job.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @Version('1')
  @ApiBody({ type: [CreateJobDto] })
  async create(@Body() createJobDto: CreateJobDto[]) {
    return await this.jobsService.create(createJobDto);
  }

  @Get()
  @Version('1')
  async findAll(@Query() queries: FindJobs) {
    return await this.jobsService.findAll(queries.page, queries.limit);
  }

  @Get(':id')
  @Version('1')
  async findOne(@Param() queries: GetOneJobQueryDto) {
    return await this.jobsService.findOne(queries.id);
  }
}
