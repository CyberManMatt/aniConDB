import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HotelsService } from './providers/hotels.service';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { GetHotelsDto } from './dtos/get-hotels.dto';
import { GetHotelDetailsDto } from './dtos/get-hotel-details.dto';
import { PatchHotelDto } from './dtos/patch-hotel.dto';

@ApiBearerAuth()
@Controller('hotels')
@UseInterceptors(ClassSerializerInterceptor)
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The hotel has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiOperation({ summary: 'Create a new hotel' })
  public createHotel(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.createHotel(createHotelDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [GetHotelsDto],
    description: 'The hotels have been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'Get all hotels' })
  public getHotels() {
    return this.hotelsService.getHotels();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: GetHotelDetailsDto,
    description: 'The hotel has been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiOperation({ summary: 'Get a hotel by ID' })
  public getHotelById(@Param('id') id: number) {
    return this.hotelsService.getHotelById(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The hotel has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiOperation({ summary: 'Update a hotel by ID' })
  public updateHotel(
    @Param('id') id: number,
    @Body() updateHotelDto: PatchHotelDto,
  ) {
    return this.hotelsService.updateHotel(id, updateHotelDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The hotel has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiOperation({ summary: 'Delete a hotel by ID' })
  public deleteHotel(@Param('id') id: number) {
    return this.hotelsService.deleteHotel(id);
  }
}
