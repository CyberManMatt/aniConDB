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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VendorsService } from './providers/vendors.service';
import { CreateVendorDto } from './dtos/create-vendor.dto';
import { GetVendorsDto } from './dtos/get-vendors.dto';
import { GetVendorsQueryDto } from './dtos/get-vendors-query.dto';
import { GetVendorDetailsDto } from './dtos/get-vendor-details.dto';
import { PatchVendorDto } from './dtos/patch-vendor.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('vendors')
@UseInterceptors(ClassSerializerInterceptor)
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The vendor has been created successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiOperation({ summary: 'Create a new vendor' })
  public createVendor(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.createVendor(createVendorDto);
  }

  @Auth(AuthType.None)
  @Get()
  @ApiResponse({
    status: 201,
    description: 'The vendors have been successfully retrieved',
    type: [GetVendorsDto],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiOperation({ summary: 'Gets all vendors' })
  public getVendors(@Query() vendorsQuery: GetVendorsQueryDto) {
    return this.vendorsService.getVendors(vendorsQuery);
  }

  @Auth(AuthType.None)
  @Get(':id')
  @ApiResponse({
    status: 200,
    type: GetVendorDetailsDto,
    description: 'Vendor has been successfully retireved',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Vendor Not Found' })
  public getVendorById(@Param('id') id: number) {
    return this.vendorsService.getVendorById(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The vendor has been successfully updated',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Vendor Not Found' })
  @ApiOperation({ summary: "Update a vendor's info" })
  public updateVendor(
    @Param('id') id: number,
    @Body() patchVendorDto: PatchVendorDto,
  ) {
    return this.vendorsService.updateVendor(id, patchVendorDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The vendor has been successfully deleted',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Vendor Not Found' })
  @ApiOperation({ summary: 'Delete a vendor' })
  public deleteVendor(@Param('id') id: number) {
    return this.vendorsService.deleteVendor(id);
  }
}
