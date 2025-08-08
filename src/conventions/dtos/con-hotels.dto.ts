import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ConHotelsDto {
  @Expose()
  @ApiProperty({ description: 'The unique identifier of the hotel' })
  id: number;

  @Expose()
  @ApiProperty({ description: 'The name of the hotel' })
  name: string;

  @Expose()
  @ApiProperty({ description: 'The address (line 1) of the hotel' })
  address1: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The address (line 2) of the hotel' })
  address2: string;

  @Expose()
  @ApiProperty({ description: 'The city of the hotel' })
  city: string;

  @Expose()
  @ApiProperty({ description: 'The state or province of the hotel' })
  state: string;

  @Expose()
  @ApiProperty({ description: 'The zip code of the hotel' })
  zip: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The phone number of the hotel' })
  phone: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The website of the hotel' })
  website: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The image or logo of the hotel' })
  image: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The alt text of the image or logo' })
  image_alt: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The description of the hotel' })
  description: string;

  @Expose()
  @ApiProperty({
    description: 'Whether the hotel has a convention block for reservations',
  })
  conBlock: boolean;

  @Expose()
  @ApiProperty({
    description:
      'The reservation deadline of the convention block for reservations',
  })
  reservationDeadline: Date;

  @Expose()
  @ApiPropertyOptional({
    description:
      'The reservation page of the convention block for reservations',
  })
  reservationPage: string;
}
