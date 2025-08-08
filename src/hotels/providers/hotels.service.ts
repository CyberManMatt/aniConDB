import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Hotel } from '../hotel.entity';
import { CreateHotelDto } from '../dtos/create-hotel.dto';
import { validateOrReject } from 'class-validator';
import { Convention } from '../../conventions/convention.entity';
import { In } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelsRepository: Repository<Hotel>,
    @InjectRepository(Convention)
    private readonly conventionRepository: Repository<Convention>,
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
}
