import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsPhoneNumber, IsPostalCode, IsString, IsUrl, isURL, MaxLength } from "class-validator";
import { Convention } from "src/conventions/convention.entity";

export class CreateVendorDto {

    @Expose()
    @ApiProperty({ description: 'The name of the vendor' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The address (line 1) of the vendor' })
    @IsString()
    address1: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The address (line 2) of the vendor' })
    @IsString()
    address2?: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The city of the vendor' })
    @IsString()
    city: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The state or province of the vendor' })
    @IsString()
    @MaxLength(2)
    state: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The zip code of the vendor' })
    @IsString()
    @MaxLength(5)
    @IsPostalCode('US')
    zip: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The phone number of the vendor' })
    @IsString()
    @MaxLength(10)
    @IsPhoneNumber('US')
    phone?: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The website of the vendor' })
    @IsString()
    @IsUrl()
    website?: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The image URL of the vendor' })
    @IsString()
    @IsUrl()
    image?: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The alt text for the vendor image' })
    @IsString()
    image_alt?: string;

    @Expose()
    @ApiPropertyOptional({ description: 'A description of the vendor' })
    @IsString()
    description?: string;

    @Expose()
    @ApiPropertyOptional({ description: 'Conventions associated with the vendor' })
    @IsArray()
    @Type(() => Number)
    @IsInt({ each: true })
    conventions?: Convention[];
}