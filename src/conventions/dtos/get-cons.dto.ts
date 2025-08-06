import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class GetConsDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty({ description: 'The name of the convention' })
  name: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The description of the convention' })
  description: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The image or logo of the convention' })
  image: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The alt text of the image or logo' })
  image_alt: string;

  @Expose()
  @ApiProperty({ description: 'The start date of the convention' })
  startDate: Date;

  @Expose()
  @ApiProperty({ description: 'The end date of the convention' })
  endDate: Date;

  @Expose()
  @ApiPropertyOptional({ description: 'The website of the convention' })
  webpage: string;

  @Expose()
  @ApiProperty({ description: 'The venue ID of the convention' })
  @Type(() => Number)
  venueId: number;
}
