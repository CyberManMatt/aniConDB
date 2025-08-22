import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VendorsService } from './providers/vendors.service';
import { CreateVendorDto } from './dtos/create-vendor.dto';

@ApiBearerAuth()
@Controller('vendors')
@UseInterceptors(ClassSerializerInterceptor)
export class VendorsController {
    constructor(private readonly vendorsService: VendorsService){}

    @Post()
    @ApiResponse({
        status: 201,
        description: 'The vendor has been created successfully'
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: 'Bad Request.'})
    @ApiOperation({ summary: 'Create a new vendor' })
    public createVendor(@Body() CreateVendorDto: CreateVendorDto) {
        return this.vendorsService.createVendor
    }
}
