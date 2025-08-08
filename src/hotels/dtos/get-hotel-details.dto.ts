import { Expose, Type } from "class-transformer";
import { HotelConsDto } from "./hotel-cons.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsPostalCode, IsPhoneNumber, IsUrl, IsArray, ValidateNested } from "class-validator";

export class GetHotelDetailsDto {
    @Expose()
    @ApiProperty({ description: 'The name of the hotel' })
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @Expose()
    @ApiProperty({ description: 'The address (line 1) of the hotel' })
    @IsNotEmpty()
    @IsString()
    address1: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The address (line 2) of the hotel' })
    @IsOptional()
    @IsString()
    address2?: string;

    @Expose()
    @ApiProperty({ description: 'The city of the hotel' })
    @IsNotEmpty()
    @IsString()
    city: string;
    
    @Expose()
    @ApiProperty({ description: 'The state or province of the hotel' })
    @IsNotEmpty()
    @IsString()
    state: string;

    @Expose()
    @ApiProperty({ description: 'The zip code of the hotel' })
    @IsNotEmpty()
    @IsString()
    @IsPostalCode('US')
    zip: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The phone number of the hotel' })
    @IsOptional()
    @IsString()
    @IsPhoneNumber('US')
    phone?: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The website of the hotel' })
    @IsOptional()
    @IsString()
    @IsUrl()
    website?: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The image or logo of the hotel' })
    @IsOptional()
    @IsString()
    @IsUrl()
    image?: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The alt text of the image or logo' })
    @IsOptional()
    @IsString()
    image_alt?: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The description of the hotel' })
    @IsOptional()
    @IsString()
    description?: string;

    @Expose()
    @ApiPropertyOptional({ description: 'The conventions associated with the hotel' })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => HotelConsDto)
    conventions?: HotelConsDto[];
    
}