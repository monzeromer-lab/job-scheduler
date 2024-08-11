import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsJSON,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { JobStatus } from '../entities/job.entity';
import { IsCronExpression } from '../common/decorators/isCronExpression';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the job, which must be unique' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'An optional text field for describing the job' })
  description?: string;

  @Type(() => Date)
  @IsDateString()
  @ApiProperty({
    description:
      'The timestamp of the next scheduled execution of the job. This field is required',
  })
  nextRun: Date;

  @IsString()
  @IsNotEmpty()
  @IsCronExpression()
  @ApiProperty({
    description:
      'A string defining the schedule for the job using a cron expression. This field is required',
  })
  cronExpression: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'An optional text field specifying the HTTP endpoint to which a request will be sent upon job completion',
  })
  endpoint?: string;

  @ApiProperty()
  @IsOptional()
  @IsJSON()
  @ApiProperty({
    description:
      'An optional JSON field containing any data that should be sent with the HTTP request to the specified endpoint',
  })
  payload?: any;
}
