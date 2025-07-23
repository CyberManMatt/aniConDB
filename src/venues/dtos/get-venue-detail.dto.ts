import { CreateVenueDto } from './create-venue.dto';
import { Exclude } from 'class-transformer';

export class GetVenueDetailDto extends CreateVenueDto {
  @Exclude()
  id: number;
}
