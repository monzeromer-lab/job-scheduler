import { IsOptional, IsString, IsNumber, Min, Max, IsUUID } from "class-validator";

export class GetJobsQueryDto {
  
    @IsNumber()
    @Min(1)
    limit: number;
  
    @IsNumber()
    @Min(1)
    page: number;
  }

  export class GetOneJobQueryDto {
  
    @IsUUID()
    id: string
  }