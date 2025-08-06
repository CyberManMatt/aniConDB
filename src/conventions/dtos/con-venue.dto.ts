import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ConVenueDto {
  @Expose()
  @ApiProperty({ description: 'The unique identifier of the venue' })
  id: number;

  @Expose()
  @ApiProperty({ description: 'The name of the venue' })
  name: string;

  @Expose()
  @ApiProperty({ description: 'The address (line 1) of the venue' })
  address1: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The address (line 2) of the venue' })
  address2: string;

  @Expose()
  @ApiProperty({ description: 'The city of the venue' })
  city: string;

  @Expose()
  @ApiProperty({ description: 'The state or province of the venue' })
  state: string;

  @Expose()
  @ApiProperty({ description: 'The zip code of the venue' })
  zip: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The phone number of the venue' })
  phone: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The website of the venue' })
  website: string;

  @Expose()
  @ApiPropertyOptional({ description: 'Whether the venue has a food court' })
  foodCourt: boolean;
}
