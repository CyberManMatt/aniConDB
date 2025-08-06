import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdmissionsService } from './providers/admissions.service';
import { CreateAdmissionDto } from './dtos/create-admission.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAdmissionDetailDto } from './dtos/get-admission-detail.dto';
import { PatchAdmissionDto } from './dtos/patch-admission.dto';

@ApiBearerAuth()
@Controller('admissions')
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The admission has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiOperation({ summary: 'Create a new admission' })
  public createAdmission(@Body() createAdmissionDto: CreateAdmissionDto) {
    return this.admissionsService.createAdmission(createAdmissionDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: [GetAdmissionDetailDto],
    description: 'The admission details have been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'Get admission by ID' })
  public getAdmissions(@Param('id') id: number) {
    return this.admissionsService.getAdmissionById(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The admission has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiOperation({ summary: 'Update an admission by ID' })
  public updateAdmission(
    @Param('id') id: number,
    @Body() updateAdmissionDto: PatchAdmissionDto,
  ) {
    return this.admissionsService.updateAdmission(id, updateAdmissionDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The admission has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiOperation({ summary: 'Delete an admission by ID' })
  public deleteAdmission(@Param('id') id: number) {
    return this.admissionsService.deleteAdmission(id);
  }
}
