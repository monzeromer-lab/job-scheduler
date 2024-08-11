import { IsOptional, IsString, IsNumber, Min, Max } from "class-validator";

export class GetJobsQueryDto {
  
    @IsOptional()
    @IsNumber()
    @Min(1)
    limit?: number;
  
    @IsOptional()
    @IsNumber()
    @Min(10)
    page?: number;
  }