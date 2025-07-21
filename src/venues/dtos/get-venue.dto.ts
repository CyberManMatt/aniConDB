import { PartialType } from '@nestjs/mapped-types';
import { CreateVenueDto } from './create-venue.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetVenueDto extends PartialType(CreateVenueDto) {
  @ApiProperty()
  id: number;
}
