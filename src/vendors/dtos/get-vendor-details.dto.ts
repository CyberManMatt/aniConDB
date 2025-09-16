import { VendorConsDto } from './vendors-cons.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetVendorDetailsDto {
  @ApiProperty({ description: 'The unique identifier of the vendor' })
  id: number;

  @ApiProperty({ description: 'The name of the vendor' })
  name: string;

  @ApiProperty({ description: 'The address (line 1) of the vendor' })
  address1: string;

  @ApiProperty({ description: 'The address (line 2) of the vendor' })
  address2?: string;

  @ApiProperty({ description: 'The city of the vendor' })
  city: string;

  @ApiProperty({ description: 'The state or province of the vendor' })
  state: string;

  @ApiProperty({ description: 'The zip code of the vendor' })
  zip: string;

  @ApiProperty({ description: 'The phone number of the vendor' })
  phone?: string;

  @ApiProperty({ description: 'The website of the vendor' })
  website?: string;

  @ApiProperty({ description: 'The image URL of the vendor' })
  image?: string;

  @ApiProperty({ description: 'The alt text for the vendor image' })
  image_alt?: string;

  @ApiProperty({ description: 'A description of the vendor' })
  description?: string;

  @ApiProperty({ description: 'The venue associated with the vendor' })
  conventions: VendorConsDto[];
}
