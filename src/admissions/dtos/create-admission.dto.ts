import { IsISO8601, IsNotEmpty, IsCurrency } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateConDto } from 'src/conventions/dtos/create-con.dto';

export class CreateAdmissionDto {
  @ApiProperty({ description: 'The name of the admission' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The start date of the admission' })
  @IsNotEmpty()
  @IsISO8601()
  validFrom: Date;

  @ApiProperty({ description: 'The end date of the admission' })
  @IsNotEmpty()
  @IsISO8601()
  validTo: Date;

  @ApiProperty({ description: 'The price of the admission' })
  @IsNotEmpty()
  @IsCurrency()
  price: number;

  @ApiProperty({ description: 'Indicates if the admission is premium' })
  @IsNotEmpty()
  isPremium: boolean;

  @ApiProperty({ description: 'Indicates if the admission is for children' })
  @IsNotEmpty()
  isChild: boolean;

  @ApiProperty({ description: 'The convention associated with the admission' })
  @IsNotEmpty()
  convention: CreateConDto;
}
