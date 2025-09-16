import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

export class GetVendorsQueryBaseDto {}

export class GetVendorsQueryDto extends IntersectionType(
  PaginationQueryDto,
  GetVendorsQueryBaseDto,
) {}
