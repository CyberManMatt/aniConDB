import { IsOptional, IsPostalCode } from 'class-validator';
import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';

class GetVenuesQueryBaseDto {
  @ApiPropertyOptional({
    description: 'Filter venues by zip code.',
    example: '90210',
  })
  @IsOptional()
  @IsPostalCode('US')
  zip?: string;
}

export class GetVenuesQueryDto extends IntersectionType(
  GetVenuesQueryBaseDto,
  PaginationQueryDto,
) {}
