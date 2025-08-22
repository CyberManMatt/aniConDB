import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from '../vendor.entity';
import { In, Repository } from 'typeorm';
import { Convention } from 'src/conventions/convention.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { CreateVendorDto } from '../dtos/create-vendor.dto';

@Injectable()
export class VendorsService {
    constructor(
        @InjectRepository(Vendor)
        private readonly vendorsRepository: Repository<Vendor>,

        @InjectRepository(Convention)
        private readonly conventionRepository: Repository<Convention>,

        private readonly paginationProvider: PaginationProvider
    ){}

    public async createVendor(createVendorDto: CreateVendorDto) {
        try {
            let conventions: Convention[] = [];

            if (createVendorDto.conventions?.length) {
                conventions = await this.conventionRepository.findBy({id: In(createVendorDto.conventions)})
            }

            const vendor = this.vendorsRepository.create({
                ...createVendorDto,
                conventions
            })

            return await this.vendorsRepository.save(vendor)
        } catch (error) {
            throw new BadRequestException(`Invalid vendor data: ${error.message}`)
        }
    }
    
    public async getVendors() {}
    public async getVendorById() {}
    public async updateVendor() {}
    public async deleteVendor() {}
}
