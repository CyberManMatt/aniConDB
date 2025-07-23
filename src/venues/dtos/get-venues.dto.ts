import { CreateVenueDto } from './create-venue.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetVenuesDto extends CreateVenueDto {
    @ApiProperty({ description: 'The unique identifier of the venue' })
    id: number;
}
