import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Venue } from '../venue.entity';
import { CreateVenueDto } from '../dtos/create-venue.dto';
import { NotFoundException } from '@nestjs/common';
import { PatchVenueDto } from '../dtos/patch-venue.dto';
import { GetVenueDetailDto } from '../dtos/get-venue-detail.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class VenuesService {
  // This service can be expanded with methods to handle venue-related logic,
  // For example, methods to create, update, delete, or retrieve venues

  constructor(
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
  ) {}

  /* Create a new venue */
  public async createVenue(createVenueDto: CreateVenueDto) {
    const venue = this.venueRepository.create(createVenueDto);
    return this.venueRepository.save(venue);
  }

  /* Get all venues */
  public async getVenues(): Promise<Venue[]> {
    return this.venueRepository.find();
  }

  /* Get a venue by ID */
  public async getVenueById(id: number): Promise<GetVenueDetailDto> {
    const venue = await this.venueRepository.findOneBy({ id });
    if (!venue) {
      throw new NotFoundException(`Venue with id ${id} not found`);
    }
    return plainToInstance(GetVenueDetailDto, venue);
  }

  /* Update a venue */
  public async updateVenue(
    id: number,
    updateVenueDto: PatchVenueDto,
  ): Promise<GetVenueDetailDto> {
    const venue = await this.venueRepository.findOneBy({ id });

    if (!venue) {
      throw new NotFoundException(`Venue with id ${id} not found`);
    }

    try {
      Object.assign(venue, updateVenueDto);
      const updatedVenue = await this.venueRepository.save(venue);
      return plainToInstance(GetVenueDetailDto, updatedVenue);
    } catch (error) {
      throw new Error(`Error updating venue: ${error.message}`);
    }
  }

  /* Delete a venue */
  public async deleteVenue(id: number): Promise<void> {
    const venue = await this.venueRepository.findOneBy({ id });
    if (!venue) {
      throw new NotFoundException(`Venue with id ${id} not found`);
    }
    await this.venueRepository.remove(venue);
  }
}
