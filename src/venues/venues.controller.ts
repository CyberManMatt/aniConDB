import { Body, Controller, Post } from '@nestjs/common';
import { VenuesService } from './providers/venues.service';
import { CreateVenueDto } from './dtos/create-venue.dto';

@Controller('venues')
export class VenuesController {
    // This controller can be expanded with methods to handle HTTP requests
    // For example, methods to create, update, delete, or retrieve venues

    // The VenuesService can be injected here to handle business logic
    constructor(private readonly venuesService: VenuesService) {}

    @Post()
    public createVenue(@Body() createVenueDto: CreateVenueDto) {
        return this.venuesService.createVenue(createVenueDto);
    }
}
