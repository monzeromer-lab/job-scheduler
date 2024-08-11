import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  Logger,
  Version,
} from '@nestjs/common';
import { JobsService } from '../services/jobs.service';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { GetJobsQueryDto, GetOneJobQueryDto } from '../dto/find-job.dto';
import { ApiBody } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

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
  async findAll(@Query() queries: GetJobsQueryDto) {
    Logger.log('hi');
    return await this.jobsService.findAll(queries.page, queries.limit);
  }

  @Patch(':id')
  @Version('1')
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return await this.jobsService.updateOne(id, updateJobDto);
  }
  @Get(':id')
  @Version('1')
  async findOne(@Param() queries: GetOneJobQueryDto) {
    return await this.jobsService.findOne(queries.id);
  }
}
