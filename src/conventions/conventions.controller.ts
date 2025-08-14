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
import { ConventionsService } from './providers/conventions.service';
import { CreateConDto } from './dtos/create-con.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetConsDto } from './dtos/get-cons.dto';
import { GetConDetailDto } from './dtos/get-con-detail.dto';
import { PatchConDto } from './dtos/patch-con.dto';
import { GetConsQueryDto } from './dtos/get-cons-query.dto';

@ApiBearerAuth()
@Controller('cons')
@UseInterceptors(ClassSerializerInterceptor)
export class ConventionsController {
  // This controller can be expanded with endpoints to handle HTTP requests related to conventions
  // For example, endpoints to create, update, delete, or retrieve conventions
  constructor(private readonly conventionsService: ConventionsService) {}

  // Additional methods can be added here to handle specific routes and logic
  // For example, methods to create, update, delete, or retrieve conventions

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The convention has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiOperation({ summary: 'Create a new convention' })
  public createConvention(@Body() createConventionDto: CreateConDto) {
    // Logic to create a convention can be added here
    // This method would typically accept a DTO and call the service to handle the creation
    return this.conventionsService.createConvention(createConventionDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [GetConsDto],
    description: 'The conventions have been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'Get all conventions' })
  public getCons(@Query() consQuery: GetConsQueryDto) {
    return this.conventionsService.getConventions(consQuery);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: GetConDetailDto,
    description: 'The convention has been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiOperation({ summary: 'Get a convention by ID' })
  public getConventionById(@Param('id') id: number) {
    return this.conventionsService.getConventionById(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The convention has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiOperation({ summary: 'Update a convention' })
  public updateConvention(
    @Param('id') id: number,
    @Body() updateConventionDto: PatchConDto,
  ) {
    return this.conventionsService.updateConvention(id, updateConventionDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The convention has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiOperation({ summary: 'Delete a convention' })
  public deleteConvention(@Param('id') id: number) {
    return this.conventionsService.deleteConvention(id);
  }
}
