import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ConAdmissionsDto {
  @Expose()
  @ApiProperty({ description: 'The unique identifier of the admission' })
  id: number;

  @Expose()
  @ApiProperty({ description: 'The name of the admission' })
  name: string;

  @Expose()
  @ApiProperty({ description: 'The date from which the admission is valid' })
  validFrom: Date;

  @Expose()
  @ApiProperty({ description: 'The date until which the admission is valid' })
  validTo: Date;

  @Expose()
  @ApiProperty({ description: 'The price of the admission', type: 'number' })
  price: number;

  @Expose()
  @ApiProperty({ description: 'Indicates if the admission is premium' })
  isPremium: boolean;

  @Expose()
  @ApiProperty({ description: 'Indicates if the admission is for children' })
  isChild: boolean;
}
