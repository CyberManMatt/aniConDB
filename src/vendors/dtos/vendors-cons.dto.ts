import { ApiProperty } from '@nestjs/swagger';
import { ConVenueDto } from 'src/conventions/dtos/con-venue.dto';

export class VendorConsDto {
  @ApiProperty({ description: 'The unique identifier of the convention' })
  id: number;

  @ApiProperty({ description: 'The name of the convention' })
  name: string;

  @ApiProperty({ description: 'The description of the convention' })
  description?: string;

  @ApiProperty({ description: 'The image or logo of the convention' })
  image?: string;

  @ApiProperty({ description: 'The alt text of the image or logo' })
  image_alt?: string;

  @ApiProperty({ description: 'The start date of the convention' })
  startDate: Date;

  @ApiProperty({ description: 'The end date of the convention' })
  endDate: Date;

  @ApiProperty({ description: 'The website of the convention' })
  webpage?: string;

  @ApiProperty({ description: 'The venue of the convention' })
  venue: ConVenueDto;
}
