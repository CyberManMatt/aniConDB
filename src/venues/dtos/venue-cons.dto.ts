import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class VenueConsDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  image: string;

  @Expose()
  @ApiProperty()
  image_alt: string;

  @Expose()
  @ApiProperty()
  startDate: Date;

  @Expose()
  @ApiProperty()
  endDate: Date;

  @Expose()
  @ApiProperty()
  webpage: string;
}
