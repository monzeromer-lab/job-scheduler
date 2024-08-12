import { Transform } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';

export class GetOneJobQueryDto {
  @IsUUID()
  id: string;
}

export class FindJobs {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  page: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  limit: number;
}
