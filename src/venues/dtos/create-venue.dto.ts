import {
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
  IsOptional,
} from 'class-validator';

export class CreateVenueDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address1: string;

  @IsOptional()
  address2: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  stateProv: string;

  @IsPostalCode()
  @IsNotEmpty()
  zip: string;

  @IsNotEmpty()
  country: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @IsOptional()
  website: string;
}
