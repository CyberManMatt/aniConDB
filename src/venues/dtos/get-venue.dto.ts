import { PartialType } from '@nestjs/mapped-types';
import { CreateVenueDto } from './create-venue.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetVenueDto extends CreateVenueDto {
  @ApiProperty()
  id: number;
}
