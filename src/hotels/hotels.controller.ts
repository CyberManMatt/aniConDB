import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { HotelsService } from './providers/hotels.service';
import { CreateHotelDto } from './dtos/create-hotel.dto';

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
  public createHotel(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.createHotel(createHotelDto);
  }
}
