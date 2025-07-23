import { CreateVenueDto } from './create-venue.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetVenuesDto extends CreateVenueDto {
  @ApiProperty()
  id: number;
}
