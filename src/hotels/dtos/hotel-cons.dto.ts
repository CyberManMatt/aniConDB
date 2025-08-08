import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ConVenueDto } from "src/conventions/dtos/con-venue.dto";

export class HotelConsDto{
    @Expose()
    @ApiProperty({ description: 'The unique identifier of the convention' })
    id: number;

    @Expose()
    @ApiProperty({ description: 'The name of the convention' })
    name: string;

    @Expose()
    @ApiProperty({ description: 'The description of the convention' })
    description?: string;

    @Expose()
    @ApiProperty({ description: 'The image or logo of the convention' })
    image?: string;

    @Expose()
    @ApiProperty({ description: 'The alt text of the image or logo' })
    image_alt?: string;

    @Expose()
    @ApiProperty({ description: 'The start date of the convention' })
    startDate: Date;

    @Expose()
    @ApiProperty({ description: 'The end date of the convention' })
    endDate: Date;

    @Expose()
    @ApiProperty({ description: 'The website of the convention' })
    webpage?: string;

    @Expose()
    @ApiProperty({ description: 'The venue of the convention' })
    venue: ConVenueDto;
}