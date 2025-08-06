import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';
import { GetConsDto } from '../../conventions/dtos/get-cons.dto';

export class GetAdmissionDetailDto {
  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty({ description: 'The start date of the admission' })
  @IsNotEmpty()
  @IsISO8601()
  validFrom: Date;

  @Expose()
  @ApiProperty({ description: 'The end date of the admission' })
  @IsNotEmpty()
  @IsISO8601()
  validTo: Date;

  @Expose()
  @ApiProperty({ description: 'The price of the admission' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @Expose()
  @ApiProperty({ description: 'Indicates if the admission is premium' })
  @IsNotEmpty()
  isPremium: boolean;

  @Expose()
  @ApiProperty({ description: 'Indicates if the admission is for children' })
  @IsNotEmpty()
  isChild: boolean;

  @Expose()
  @ApiProperty({ description: 'The convention that the admission belongs to' })
  @IsNotEmpty()
  @Type(() => GetConsDto)
  convention: GetConsDto;
}
