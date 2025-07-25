import { IsISO8601, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConDto {
  @ApiProperty({ description: 'The name of the convention' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the convention' })
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'The image or logo of the convention' })
  @IsUrl({ require_protocol: true })
  @IsOptional()
  image: string;

  @ApiProperty({ description: 'The alt text of the image or logo' })
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

  @ApiProperty({ description: 'The website of the convention' })
  @IsOptional()
  @IsUrl()
  webpage: string;

  @ApiProperty({ description: 'The venue ID of the convention' })
  @IsNotEmpty()
  venueId: number;
}
