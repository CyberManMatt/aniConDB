import {
  IsArray,
  IsBoolean,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Convention } from '../../conventions/convention.entity';
import { Type } from 'class-transformer';

export class CreateHotelDto {
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
  address2: string;

  @ApiProperty({ description: 'The city of the hotel' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'The state or province of the hotel' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
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
  phone: string;

  @ApiPropertyOptional({ description: 'The website of the hotel' })
  @IsOptional()
  @IsString()
  @IsUrl()
  website: string;

  @ApiPropertyOptional({ description: 'The image or logo of the hotel' })
  @IsOptional()
  @IsString()
  @IsUrl()
  image: string;

  @ApiPropertyOptional({ description: 'The alt text of the image or logo' })
  @IsOptional()
  @IsString()
  image_alt: string;

  @ApiPropertyOptional({ description: 'The description of the hotel' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Whether the hotel has a convention block for reservations',
  })
  @IsBoolean()
  @IsNotEmpty()
  conBlock: boolean;

  @ApiProperty({
    description:
      'The reservation deadline of the convention block for reservations',
  })
  @IsNotEmpty()
  @IsISO8601()
  reservationDeadline: Date;

  @ApiPropertyOptional({
    description:
      'The reservation page of the convention block for reservations',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  reservationPage: string;

  @ApiPropertyOptional({
    description:
      'The conventions the hotel is associated with. Enter the convention ID(s) separated by a comma. For example: 1,2,3,4,5',
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  conventions: Convention[];
}
