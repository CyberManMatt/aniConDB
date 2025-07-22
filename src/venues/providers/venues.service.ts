import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Venue } from '../venue.entity';
import { CreateVenueDto } from '../dtos/create-venue.dto';
import { GetVenueDto } from '../dtos/get-venue.dto';
import { NotFoundException } from '@nestjs/common';
import { PatchVenueDto } from '../dtos/patch-venue.dto';

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
  public async getVenues(): Promise<GetVenueDto[]> {
    return this.venueRepository.find();
  }


  /* Get a venue by ID */
  public async getVenueById(id: number): Promise<GetVenueDto> {
    const venue = await this.venueRepository.findOneBy({ id });
    if (!venue) {
      throw new NotFoundException(`Venue with id ${id} not found`);
    }
    return venue;
  }


  /* Update a venue */
  public async updateVenue(id: number, updateVenueDto: PatchVenueDto): Promise<GetVenueDto> {
    const venue = await this.getVenueById(id);
    Object.assign(venue, updateVenueDto);
    return this.venueRepository.save(venue);
  }


  /* Delete a venue */
  public async deleteVenue(id: number): Promise<void> {
    const venue = await this.getVenueById(id);
    await this.venueRepository.remove(venue);
  }
}
