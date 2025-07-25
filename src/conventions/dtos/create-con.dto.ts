import { IsISO8601, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Venue } from 'src/venues/venue.entity';
import { CreateVenueDto } from 'src/venues/dtos/create-venue.dto';

export class CreateConDto {
  @ApiProperty({ description: 'The name of the convention' })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'The description of the convention' })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ description: 'The image or logo of the convention' })
  @IsUrl({ require_protocol: true })
  @IsOptional()
  image: string;

  @ApiPropertyOptional({ description: 'The alt text of the image or logo' })
  @IsOptional()
  image_alt: string;

  @ApiProperty({ description: 'The start date of the convention' })
  @IsNotEmpty()
  @IsISO8601()
  startDate: Date;

  @ApiProperty({ description: 'The end date of the convention' })
  @IsNotEmpty()
  @IsISO8601()
  endDate: Date;

  @ApiPropertyOptional({ description: 'The website of the convention' })
  @IsOptional()
  @IsUrl()
  webpage: string;

  @ApiProperty({ description: 'The venue ID of the convention' })
  @IsNotEmpty()
  venue: CreateVenueDto;
}
