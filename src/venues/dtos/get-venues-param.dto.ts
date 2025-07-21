import { IsOptional, IsInt } from 'class-validator';

export class GetVenuesParamDto {
  @IsOptional()
  @IsInt()
  id?: number;
}
