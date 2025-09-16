import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { VenueConsDto } from './venue-cons.dto';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsUrl,
} from 'class-validator';

export class GetVenueDetailDto {
  @Exclude()
  id: number;

  @Expose()
  @ApiProperty({ description: 'The name of the venue' })
  @IsNotEmpty()
  name: string;

  @Expose()
  @ApiProperty({ description: 'The address (line 1) of the venue' })
  @IsNotEmpty()
  address1: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The address (line 2) of the venue' })
  @IsOptional()
  address2?: string;

  @Expose()
  @ApiProperty({ description: 'The city of the venue' })
  @IsNotEmpty()
  city: string;

  @Expose()
  @ApiProperty({ description: 'The state or province of the venue' })
  @IsNotEmpty()
  state: string;

  @Expose()
  @ApiProperty({ description: 'The zip code of the venue' })
  @IsPostalCode('US')
  @IsNotEmpty()
  zip: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The phone number of the venue' })
  @IsPhoneNumber('US')
  @IsOptional()
  phone?: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The website of the venue' })
  @IsOptional()
  @IsUrl()
  website?: string;

  @Expose()
  @ApiPropertyOptional({ description: 'Whether the venue has a food court' })
  @IsOptional()
  foodCourt?: boolean;

  @Expose()
  @Type(() => VenueConsDto)
  @ApiProperty()
  conventions: VenueConsDto[];
}
