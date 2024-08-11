import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum JobStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity()
export class JobEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'The name of the job, which must be unique' })
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'An optional text field for describing the job' })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({
    description:
      'The timestamp of the last time the job was executed. This field is nullable, as it may not have been executed yet',
  })
  lastRun: Date;

  @Column({ type: 'timestamp' })
  @ApiProperty({
    description:
      'The timestamp of the next scheduled execution of the job. This field is required',
  })
  nextRun: Date;

  @Column()
  @ApiProperty({
    description:
      'A string defining the schedule for the job using a cron expression. This field is required',
  })
  cronExpression: string;

  @Column({ type: 'enum', enum: JobStatus, default: JobStatus.PENDING })
  @ApiProperty({
    description:
      'An enumeration representing the current status of the job (PENDING, RUNNING, SUCCESS, FAILED). This field defaults to PENDING',
  })
  status: JobStatus;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description:
      'An optional text field specifying the HTTP endpoint to which a request will be sent upon job completion',
  })
  endpoint: string;

  @Column({ type: 'json', nullable: true })
  @ApiProperty({
    description:
      'An optional JSON field containing any data that should be sent with the HTTP request to the specified endpoint',
  })
  payload: any;
}
