import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsJSON,
  IsObject,
  IsDateString,
} from 'class-validator';
import { IsCronExpression } from '../common/decorators/isCronExpression';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends CreateJobDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the job, which must be unique' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'An optional text field for describing the job' })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsCronExpression()
  @ApiProperty({
    description:
      'A string defining the schedule for the job using a cron expression. This field is required',
  })
  cronExpression: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'An optional text field specifying the HTTP endpoint to which a request will be sent upon job completion',
  })
  endpoint?: string;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description:
      'An optional JSON field containing any data that should be sent with the HTTP request to the specified endpoint',
  })
  payload?: any;
}
