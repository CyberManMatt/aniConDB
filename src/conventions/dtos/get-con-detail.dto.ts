import { Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { ConVenueDto } from './con-venue.dto';
import { ConAdmissionsDto } from './con-admissions.dto';

export class GetConDetailDto {
  @Expose()
  @ApiProperty({ description: 'The name of the convention' })
  @IsNotEmpty()
  name: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The description of the convention' })
  @IsOptional()
  description: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The image or logo of the convention' })
  @IsUrl({ require_protocol: true })
  @IsOptional()
  image: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The alt text of the image or logo' })
  @IsOptional()
  image_alt: string;

  @Expose()
  @ApiProperty({ description: 'The start date of the convention' })
  @IsNotEmpty()
  @IsISO8601()
  startDate: Date;

  @Expose()
  @ApiProperty({ description: 'The end date of the convention' })
  @IsNotEmpty()
  @IsISO8601()
  endDate: Date;

  @Expose()
  @ApiPropertyOptional({ description: 'The website of the convention' })
  @IsOptional()
  @IsUrl()
  webpage: string;

  @Expose()
  @ApiProperty({ description: 'The venue for the convention' })
  @Type(() => ConVenueDto)
  @IsNotEmpty()
  @ValidateNested()
  venue: ConVenueDto;

  @Expose()
  @ApiPropertyOptional({
    description: 'The admissions (badges) for the convention',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConAdmissionsDto)
  admissions: ConAdmissionsDto[];
}
