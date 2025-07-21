import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Venue } from '../venue.entity';
import { CreateVenueDto } from '../dtos/create-venue.dto';


@Injectable()
export class VenuesService {
  // This service can be expanded with methods to handle venue-related logic
  // For example, methods to create, update, delete, or retrieve venues

  constructor(
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
  ) {}

  /* Create a new venue */
  createVenue(createVenueDto: CreateVenueDto) {
    const venue = this.venueRepository.create(createVenueDto);
    return this.venueRepository.save(venue);
  }
}