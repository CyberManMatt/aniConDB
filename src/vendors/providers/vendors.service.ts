import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from '../vendor.entity';
import { In, Repository } from 'typeorm';
import { Convention } from 'src/conventions/convention.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { CreateVendorDto } from '../dtos/create-vendor.dto';
import { GetVendorsQueryDto } from '../dtos/get-vendors-query.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { plainToInstance } from 'class-transformer';
import { GetVendorDetailsDto } from '../dtos/get-vendor-details.dto';
import { PatchVendorDto } from '../dtos/patch-vendor.dto';

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
    
    public async getVendors(
        vendorQuery: GetVendorsQueryDto
    ): Promise<Paginated<Vendor>> {
        return await this.paginationProvider.paginateQuery(
            {
                limit: vendorQuery.limit,
                page: vendorQuery.page
            }, 
            this.vendorsRepository
        );
    }

    public async getVendorById(id: number) {
        try {
            const vendor = await this.vendorsRepository.findOne({
                where: {id},
                relations: ['conventions']
            })

            if (!vendor) {
                throw new BadRequestException(`Vendor with ID ${id} not found`)
            }

            return plainToInstance(GetVendorDetailsDto, vendor, {excludeExtraneousValues: true})
        } catch (error) {
            throw new BadRequestException(`Error fetching vendor: ${error.message}`)
        }
    }

    public async updateVendor(id: number, patchVendorDto: PatchVendorDto) {
        try {
            const vendor = await this.vendorsRepository.findOne({where: {id}})

            if (!vendor) {
                throw new BadRequestException(`Vendor with ID ${id} not found`)
            }

            let updatedVendor
            if (patchVendorDto.conventions !== undefined) {
                let conventions: Convention[] = []
                if (patchVendorDto.conventions?.length) {
                    conventions = await this.conventionRepository.findBy({
                        id: In(patchVendorDto.conventions)
                    })
                }
                updatedVendor = this.vendorsRepository.merge(vendor, {
                    ...patchVendorDto, conventions
                });
            } else {
                const { conventions, ...rest } = patchVendorDto
                updatedVendor = this.vendorsRepository.merge(vendor, rest)
            }

            const savedVendor = await this.vendorsRepository.save(updatedVendor)

            return plainToInstance(GetVendorDetailsDto, savedVendor, {excludeExtraneousValues: true})
        } catch (error) {
            throw new BadRequestException(`Error updating vendor: ${error.message}`);
        }
    }
    
    public async deleteVendor(id: number) {
        try {
            const vendor = await this.vendorsRepository.findOne({where: {id}})

            if (!vendor) {
                throw new BadRequestException(`Vendor with ID ${id} not found`)
            }

            await this.vendorsRepository.remove(vendor)
            return {message: 'Vendor removed successfully'}
        } catch (error) {
            throw new BadRequestException(`Error removing vendor: ${error.message}`)
        }
    }
}
