import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer"

export class ConVendorsDto {
    @ApiProperty({ description: 'The unique identifier of the vendor' })
    @Expose()
    id: number;

    @ApiProperty({ description: 'The name of the vendor' })
    @Expose()
    name: string;

    @ApiProperty({ description: 'The address (line 1) of the vendor' })
    @Expose()
    address1: string;

    @ApiProperty({ description: 'The address (line 2) of the vendor' })
    @Expose()
    address2?: string;

    @ApiProperty({ description: 'The city of the vendor' })
    @Expose()
    city: string;

    @ApiProperty({ description: 'The state or province of the vendor' })
    @Expose()
    state: string;

    @ApiProperty({ description: 'The zip code of the vendor' })
    @Expose()
    zip: string;

    @ApiProperty({ description: 'The phone number of the vendor' })
    @Expose()
    phone?: string;

    @ApiProperty({ description: 'The website of the vendor' })
    @Expose()
    website?: string;

    @ApiProperty({ description: 'The image URL of the vendor' })
    @Expose()
    image?: string;

    @ApiProperty({ description: 'The alt text for the vendor image' })
    @Expose()
    image_alt?: string;

    @ApiProperty({ description: 'A description of the vendor' })
    @Expose()
    description?: string;
}