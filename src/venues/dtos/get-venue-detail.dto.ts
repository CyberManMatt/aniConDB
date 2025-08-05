import { ApiProperty } from '@nestjs/swagger';
import { CreateVenueDto } from './create-venue.dto';
import { Exclude } from 'class-transformer';
import { GetConsDto } from 'src/conventions/dtos/get-cons.dto';

export class GetVenueDetailDto extends CreateVenueDto {
  @Exclude()
  id: number;

  @ApiProperty()
  conventions: GetConsDto[]
}
