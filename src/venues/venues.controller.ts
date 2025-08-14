import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { VenuesService } from './providers/venues.service';
import { CreateVenueDto } from './dtos/create-venue.dto';
import { PatchVenueDto } from './dtos/patch-venue.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { GetVenuesDto } from './dtos/get-venues.dto';
import { GetVenueDetailDto } from './dtos/get-venue-detail.dto';
import { GetVenuesQueryDto } from './dtos/get-venues-query.dto';

@ApiBearerAuth()
@Controller('venues')
@UseInterceptors(ClassSerializerInterceptor)
export class VenuesController {
  // This controller can be expanded with methods to handle HTTP requests,
  // For example, methods to create, update, delete, or retrieve venues

  // The VenuesService can be injected here to handle business logic
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiOperation({ summary: 'Create a new venue' })
  public createVenue(@Body() createVenueDto: CreateVenueDto) {
    return this.venuesService.createVenue(createVenueDto);
  }

  @Get()
  @ApiOkResponse({
    type: [GetVenuesDto],
    description: 'The record has been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'Get all venues' })
  public getVenues(@Query() venueQuery: GetVenuesQueryDto) {
    return this.venuesService.getVenues(venueQuery);
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetVenueDetailDto,
    description: 'The record has been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiOperation({ summary: 'Get a venue by ID' })
  public getVenueById(@Param('id') id: number) {
    return this.venuesService.getVenueById(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiOperation({ summary: 'Update a venue' })
  public updateVenue(
    @Param('id') id: number,
    @Body() updateVenueDto: PatchVenueDto,
  ) {
    return this.venuesService.updateVenue(id, updateVenueDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiOperation({ summary: 'Delete a venue' })
  public deleteVenue(@Param('id') id: number) {
    return this.venuesService.deleteVenue(id);
  }
}
