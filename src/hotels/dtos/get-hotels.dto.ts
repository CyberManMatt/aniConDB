import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsPostalCode,
  IsPhoneNumber,
  IsUrl,
} from 'class-validator';

export class GetHotelsDto {
  @ApiProperty({ description: 'The unique identifier of the hotel' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'The name of the hotel' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The address (line 1) of the hotel' })
  @IsNotEmpty()
  @IsString()
  address1: string;

  @ApiPropertyOptional({ description: 'The address (line 2) of the hotel' })
  @IsOptional()
  @IsString()
  address2?: string;

  @ApiProperty({ description: 'The city of the hotel' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'The state or province of the hotel' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ description: 'The zip code of the hotel' })
  @IsNotEmpty()
  @IsString()
  @IsPostalCode('US')
  zip: string;

  @ApiPropertyOptional({ description: 'The phone number of the hotel' })
  @IsOptional()
  @IsString()
  @IsPhoneNumber('US')
  phone?: string;

  @ApiPropertyOptional({ description: 'The website of the hotel' })
  @IsOptional()
  @IsString()
  @IsUrl()
  website?: string;

  @ApiPropertyOptional({ description: 'The image or logo of the hotel' })
  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;

  @ApiPropertyOptional({ description: 'The alt text of the image or logo' })
  @IsOptional()
  @IsString()
  image_alt?: string;

  @ApiPropertyOptional({ description: 'The description of the hotel' })
  @IsOptional()
  @IsString()
  description?: string;
}
