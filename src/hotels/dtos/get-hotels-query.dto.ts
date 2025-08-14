import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsPostalCode } from 'class-validator';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';

export class GetHotelsQueryBaseDto {
  @ApiPropertyOptional({
    description: 'Filter hotels by zip code',
    example: '94103',
  })
  @IsOptional()
  @IsPostalCode('US')
  zip?: string;
}

export class GetHotelsQueryDto extends IntersectionType(
  GetHotelsQueryBaseDto,
  PaginationQueryDto,
) {}
