import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsPostalCode } from 'class-validator';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';

class GetConsQueryBaseDto {
  @ApiPropertyOptional({
    description: 'Filter conventions by zip code',
    example: '94103',
  })
  @IsOptional()
  @IsPostalCode('US')
  zip?: string;
}

export class GetConsQueryDto extends IntersectionType(
  GetConsQueryBaseDto,
  PaginationQueryDto,
) {}
