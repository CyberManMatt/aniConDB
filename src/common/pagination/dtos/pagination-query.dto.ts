import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'The page number for pagination',
    default: 1,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number;

  @ApiPropertyOptional({
    description: 'The number of items per page',
    default: 10,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit: number;
}
