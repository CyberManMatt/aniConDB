import {
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVenueDto {
  @ApiProperty({ description: 'The name of the venue' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The address (line 1) of the venue' })
  @IsNotEmpty()
  address1: string;

  @ApiPropertyOptional({ description: 'The address (line 2) of the venue' })
  @IsOptional()
  address2: string;

  @ApiProperty({ description: 'The city of the venue' })
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'The state or province of the venue' })
  @IsNotEmpty()
  stateProv: string;

  @ApiProperty({ description: 'The zip code of the venue' })
  @IsPostalCode('US')
  @IsNotEmpty()
  zip: string;

  @ApiProperty({ description: 'The country of the venue' })
  @IsNotEmpty()
  country: string;

  @ApiPropertyOptional({ description: 'The phone number of the venue' })
  @IsPhoneNumber('US')
  @IsOptional()
  phone: string;

  @ApiPropertyOptional({ description: 'The website of the venue' })
  @IsOptional()
  @IsUrl()
  website: string;

  @ApiPropertyOptional({ description: 'Whether the venue has a food court' })
  @IsOptional()
  foodCourt: boolean;
}
