import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Hotel } from '../hotel.entity';
import { CreateHotelDto } from '../dtos/create-hotel.dto';
import { Convention } from '../../conventions/convention.entity';
import { In } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetHotelDetailsDto } from '../dtos/get-hotel-details.dto';
import { PatchHotelDto } from '../dtos/patch-hotel.dto';
import { GetHotelsQueryDto } from '../dtos/get-hotels-query.dto';
import { Paginated } from '../../common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from '../../common/pagination/providers/pagination.provider';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelsRepository: Repository<Hotel>,
    @InjectRepository(Convention)
    private readonly conventionRepository: Repository<Convention>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async createHotel(createHotelDto: CreateHotelDto) {
    try {
      let conventions: Convention[] = [];
      if (createHotelDto.conventions?.length) {
        conventions = await this.conventionRepository.findBy({
          id: In(createHotelDto.conventions),
        });
      }

      const hotel = this.hotelsRepository.create({
        ...createHotelDto,
        conventions,
      });

      return await this.hotelsRepository.save(hotel);
    } catch (error) {
      throw new BadRequestException(`Invalid hotel data: ${error.message}`);
    }
  }

  public async getHotels(
    hotelsQuery: GetHotelsQueryDto,
  ): Promise<Paginated<Hotel>> {
    return await this.paginationProvider.paginateQuery(
      {
        limit: hotelsQuery.limit,
        page: hotelsQuery.page,
      },
      this.hotelsRepository,
    );
  }

  public async getHotelById(id: number) {
    try {
      const hotel = await this.hotelsRepository.findOne({
        where: { id },
        relations: ['conventions'],
      });

      if (!hotel) {
        throw new BadRequestException(`Hotel with ID ${id} not found`);
      }

      return plainToInstance(GetHotelDetailsDto, hotel, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new BadRequestException(`Error fetching hotel: ${error.message}`);
    }
  }

  public async updateHotel(id: number, updateHotelDto: PatchHotelDto) {
    try {
      const hotel = await this.hotelsRepository.findOne({ where: { id } });

      if (!hotel) {
        throw new BadRequestException(`Hotel with ID ${id} not found`);
      }

      let updatedHotel;
      if (updateHotelDto.conventions !== undefined) {
        let conventions: Convention[] = [];
        if (updateHotelDto.conventions?.length) {
          conventions = await this.conventionRepository.findBy({
            id: In(updateHotelDto.conventions),
          });
        }
        updatedHotel = this.hotelsRepository.merge(hotel, {
          ...updateHotelDto,
          conventions,
        });
      } else {
        // Do not touch conventions if not provided
        const { conventions, ...rest } = updateHotelDto;
        updatedHotel = this.hotelsRepository.merge(hotel, rest);
      }

      // Persist the changes
      const savedHotel = await this.hotelsRepository.save(updatedHotel);

      return plainToInstance(GetHotelDetailsDto, savedHotel, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new BadRequestException(`Error updating hotel: ${error.message}`);
    }
  }

  public async deleteHotel(id: number) {
    try {
      const hotel = await this.hotelsRepository.findOne({ where: { id } });

      if (!hotel) {
        throw new BadRequestException(`Hotel with ID ${id} not found`);
      }

      await this.hotelsRepository.remove(hotel);
      return { message: 'Hotel deleted successfully' };
    } catch (error) {
      throw new BadRequestException(`Error deleting hotel: ${error.message}`);
    }
  }
}
