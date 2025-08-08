import {
  IsArray,
  IsBoolean,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Convention } from '../../conventions/convention.entity';
import { Expose, Type } from 'class-transformer';

export class CreateHotelDto {
  @Expose()
  @ApiProperty({ description: 'The name of the hotel' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty({ description: 'The address (line 1) of the hotel' })
  @IsNotEmpty()
  @IsString()
  address1: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The address (line 2) of the hotel' })
  @IsOptional()
  @IsString()
  address2: string;

  @Expose()
  @ApiProperty({ description: 'The city of the hotel' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @Expose()
  @ApiProperty({ description: 'The state or province of the hotel' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  state: string;

  @Expose()
  @ApiProperty({ description: 'The zip code of the hotel' })
  @IsNotEmpty()
  @IsString()
  @IsPostalCode('US')
  zip: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The phone number of the hotel' })
  @IsOptional()
  @IsString()
  @IsPhoneNumber('US')
  phone: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The website of the hotel' })
  @IsOptional()
  @IsString()
  @IsUrl()
  website: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The image or logo of the hotel' })
  @IsOptional()
  @IsString()
  @IsUrl()
  image: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The alt text of the image or logo' })
  @IsOptional()
  @IsString()
  image_alt: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The description of the hotel' })
  @IsOptional()
  @IsString()
  description: string;

  @Expose()
  @ApiProperty({
    description: 'Whether the hotel has a convention block for reservations',
  })
  @IsBoolean()
  @IsNotEmpty()
  conBlock: boolean;

  @Expose()
  @ApiProperty({
    description:
      'The reservation deadline of the convention block for reservations',
  })
  @IsNotEmpty()
  @IsISO8601()
  reservationDeadline: Date;

  @Expose()
  @ApiPropertyOptional({
    description:
      'The reservation page of the convention block for reservations',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  reservationPage: string;

  @Expose()
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
