import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsArray,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'Email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Password (Minimum 8 characters, at least one letter, one number and one special character)',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
  })
  password: string;

  @ApiPropertyOptional({ description: 'State of residence' })
  @MaxLength(2)
  @IsString()
  @IsOptional()
  state: string;

  @ApiPropertyOptional({ description: 'City of residence' })
  @IsString()
  @IsOptional()
  city: string;

  @ApiPropertyOptional({ description: 'Gender' })
  @IsString()
  @IsOptional()
  gender: string;

  @ApiPropertyOptional({ description: 'Pronouns' })
  @IsArray()
  @IsOptional()
  pronouns: string[];

  @ApiPropertyOptional({ description: 'Bio' })
  @IsString()
  @IsOptional()
  bio: string;

  @ApiPropertyOptional({ description: 'Socials' })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  socials: string[];

  @ApiPropertyOptional({ description: 'Image' })
  @IsUrl()
  @IsString()
  @IsOptional()
  image: string;
}
