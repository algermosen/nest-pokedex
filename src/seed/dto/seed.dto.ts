import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class SeedDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  region?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  limit?: number;
}
