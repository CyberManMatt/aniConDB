import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VenuesService } from './providers/venues.service';
import { CreateVenueDto } from './dtos/create-venue.dto';
import { PatchVenueDto } from './dtos/patch-venue.dto';
import { GetVenueDto } from './dtos/get-venue.dto';

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

    @Get()
    public getVenues() {
        return this.venuesService.getVenues();
    }

    @Get(':id')
    public getVenueById(@Param('id') id: number) {
        return this.venuesService.getVenueById(id);
    }

    @Patch()
    public updateVenue(@Param('id') id: number, @Body() updateVenueDto: PatchVenueDto) {
        return this.venuesService.updateVenue(id, updateVenueDto);
    }

    @Delete()
    public deleteVenue(@Param('id') id: number) {
        return this.venuesService.deleteVenue(id);
    }
}
