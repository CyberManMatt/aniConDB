import { Test, TestingModule } from '@nestjs/testing';
import { VenuesService } from './venues.service';
import { PaginationProvider } from '../../common/pagination/providers/pagination.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Venue } from '../venue.entity';
import { Convention } from '../../conventions/convention.entity';

describe('VenuesService', () => {
  let service: VenuesService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VenuesService,
        { provide: PaginationProvider, useValue: {} },
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Venue), useValue: {} },
        { provide: getRepositoryToken(Convention), useValue: {} },
      ],
    }).compile();

    service = module.get<VenuesService>(VenuesService);
  });

  // Check if the service is defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
  describe('createVenue', () => {

    // Check if the createVenue method is defined
    it('should be defined', () => {
      expect(service.createVenue).toBeDefined();
    });

    // Check if the createVenue method creates a venue
    it('should create a venue', async () => {
      const createVenueDto = {
        name: 'Test Venue',
        address1: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zip: '12345',
      };
      const venue = { id: 1, ...createVenueDto };

      const venueRepository = {
        create: jest.fn().mockReturnValue(venue),
        save: jest.fn().mockResolvedValue(venue),
      };
      (service as any).venueRepository = venueRepository;

      const result = await service.createVenue(createVenueDto);
      expect(venueRepository.create).toHaveBeenCalledWith(createVenueDto);
      expect(venueRepository.save).toHaveBeenCalledWith(venue);
      expect(result).toEqual(venue);
    });

    // Check if the createVenue method throws an error when missing required fields
    it('should throw an error when missing required fields', async () => {
      const createVenueDto = {
        address1: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zip: '12345',
      };

      await expect(service.createVenue(createVenueDto as any)).rejects.toThrow();
    });

    // Check if the createVenue method throws an error when inputting invalid data
    it('should throw an error when inputting invalid data', async () => {
      const createVenueDto = {
        name: 'Test Venue',
        address1: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zip: 'invalid-zip',
      };

      await expect(service.createVenue(createVenueDto as any)).rejects.toThrow();
    });

  });

  describe('getVenues', () => {

    // Check if the getVenues method is defined
    it('should be defined', () => {
      expect(service.getVenues).toBeDefined();
    });

    // Check if getVenues returns an array of venues
    it('should return an array of venues', async () => {
      const venueQuery = { limit: 10, page: 1 };
      const paginatedVenues = {
        items: [{ id: 1, name: 'Test Venue' }],
        meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 },
      };

      const paginationProvider = {
        paginateQuery: jest.fn().mockResolvedValue(paginatedVenues),
      };
      (service as any).paginationProvider = paginationProvider;

      const venueRepository = {};
      (service as any).venueRepository = venueRepository;

      const result = await service.getVenues(venueQuery);
      expect(paginationProvider.paginateQuery).toHaveBeenCalledWith(
        { limit: venueQuery.limit, page: venueQuery.page },
        venueRepository,
      );
      expect(result).toEqual(paginatedVenues);
    });

    // Check if the getVenues method returns an empty array when no venues exist
    it('should return an empty array when no venues exist', async () => {
      const venueQuery = { limit: 10, page: 1 };
      const paginatedVenues = { items: [], meta: { totalItems: 0, itemCount: 0, itemsPerPage: 10, totalPages: 0, currentPage: 1 } };

      const paginationProvider = {
        paginateQuery: jest.fn().mockResolvedValue(paginatedVenues),
      };
      (service as any).paginationProvider = paginationProvider;

      const venueRepository = {};
      (service as any).venueRepository = venueRepository;

      const result = await service.getVenues(venueQuery);
      expect(paginationProvider.paginateQuery).toHaveBeenCalledWith(
        { limit: venueQuery.limit, page: venueQuery.page },
        venueRepository,
      );
      expect(result).toEqual(paginatedVenues);
    });

    // Check if the getVenues method calls paginationProvider.paginateQuery with correct parameters
    it('should call paginationProvider.paginateQuery with correct parameters', async () => {
      const venueQuery = { limit: 10, page: 1 };
      const paginatedVenues = {
        items: [{ id: 1, name: 'Test Venue' }],
        meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 },
      };

      const paginationProvider = {
        paginateQuery: jest.fn().mockResolvedValue(paginatedVenues),
      };
      (service as any).paginationProvider = paginationProvider;

      const venueRepository = {};
      (service as any).venueRepository = venueRepository;

      const result = await service.getVenues(venueQuery);
      expect(paginationProvider.paginateQuery).toHaveBeenCalledWith(
        { limit: venueQuery.limit, page: venueQuery.page },
        venueRepository,
      );
      expect(result).toEqual(paginatedVenues);
    });

    // Check if the getVenues method returns paginated venues
    it('should return paginated venues', async () => {
      const venueQuery = { limit: 10, page: 1 };
      const paginatedVenues = {
        items: [{ id: 1, name: 'Test Venue' }],
        meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 },
      };

      const paginationProvider = {
        paginateQuery: jest.fn().mockResolvedValue(paginatedVenues),
      };
      (service as any).paginationProvider = paginationProvider;

      const venueRepository = {};
      (service as any).venueRepository = venueRepository;

      const result = await service.getVenues(venueQuery);
      expect(paginationProvider.paginateQuery).toHaveBeenCalledWith(
        { limit: venueQuery.limit, page: venueQuery.page },
        venueRepository,
      );
      expect(result).toEqual(paginatedVenues);
    });
  });

  describe('getVenueById', () => {
    // Check if the getVenueById method is defined
    it('should be defined', () => {
      expect(service.getVenueById).toBeDefined();
    });

    // Check if getVenueById returns a venue when found
    it('should return a venue when found', async () => {
      const venue = {
        name: 'Test Venue',
        address1: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zip: '12345',
        conventions: [],
      };

      const venueRepository = {
        findOne: jest.fn().mockResolvedValue(venue),
      };
      (service as any).venueRepository = venueRepository;

      const result = await service.getVenueById(1);
      expect(venueRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['conventions'],
      });
      expect(result).toEqual(expect.objectContaining({ name: 'Test Venue' }));
    });

    // Check if getVenueById throws NotFoundException when venue not found
    it('should throw NotFoundException when venue not found', async () => {
      const venueRepository = {
        findOne: jest.fn().mockResolvedValue(null),
      };
      (service as any).venueRepository = venueRepository;

      await expect(service.getVenueById(1)).rejects.toThrow('Venue with id 1 not found');
      expect(venueRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['conventions'],
      });
    });
  })

  describe('updateVenue', () => {
    // Check if the updateVenue method is defined
    it('should be defined', () => {
      expect(service.updateVenue).toBeDefined();
    });

    // Check if updateVenue updates and returns the venue when found
    it('should update and return the venue when found', async () => {
      const existingVenue = {
        id: 1,
        name: 'Old Venue',
        address1: '123 Old St',
        city: 'Old City',
        state: 'OS',
        zip: '54321',
      };
      const updateVenueDto = {
        name: 'Updated Venue',
        address1: '456 New St',
        city: 'New City',
        state: 'NS',
        zip: '12345',
      };
      const updatedVenue = { ...existingVenue, ...updateVenueDto };

      const venueRepository = {
        findOneBy: jest.fn().mockResolvedValue(existingVenue),
        save: jest.fn().mockResolvedValue(updatedVenue),
      };
      (service as any).venueRepository = venueRepository;

      const result = await service.updateVenue(1, updateVenueDto);
      expect(venueRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(venueRepository.save).toHaveBeenCalledWith(updatedVenue);
      expect(result).toEqual(expect.objectContaining({ name: 'Updated Venue' }));
    });

    // Check if updateVenue throws NotFoundException when venue not found
    it('should throw NotFoundException when venue not found', async () => {
      const venueRepository = {
        findOneBy: jest.fn().mockResolvedValue(null),
      };
      (service as any).venueRepository = venueRepository;

      const updateVenueDto = {
        name: 'Updated Venue',
        address1: '456 New St',
        city: 'New City',
        state: 'NS',
        zip: '12345',
      };

      await expect(service.updateVenue(1, updateVenueDto)).rejects.toThrow('Venue with id 1 not found');
      expect(venueRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    // Check if updateVenue throws an error when inputting invalid data
    it('should throw an error when inputting invalid data', async () => {
      const existingVenue = {
        id: 1,
        name: 'Old Venue',
        address1: '123 Old St',
        city: 'Old City',
        state: 'OS',
        zip: '54321',
      };

      const venueRepository = {
        findOneBy: jest.fn().mockResolvedValue(existingVenue),
        save: jest.fn().mockRejectedValue(new Error('Invalid data')),
      };
      (service as any).venueRepository = venueRepository;

      const updateVenueDto = {
        name: 'Updated Venue',
        address1: '456 New St',
        city: 'New City',
        state: 'NS',
        zip: 'invalid-zip',
      };

      await expect(service.updateVenue(1, updateVenueDto)).rejects.toThrow('Error updating venue: Invalid data');
      expect(venueRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(venueRepository.save).toHaveBeenCalled();
    });

    // Check if updateVenue correctly merges existing venue data with updateVenueDto
    it('should correctly merge existing venue data with updateVenueDto', async () => {
      const existingVenue = {
        id: 1,
        name: 'Old Venue',
        address1: '123 Old St',
        city: 'Old City',
        state: 'OS',
        zip: '54321',
        phone: '123-456-7890',
      };
      const updateVenueDto = {
        name: 'Updated Venue',
        address1: '456 New St',
        city: 'New City',
        state: 'NS',
        zip: '12345',
      };
      const mergedVenue = { ...existingVenue, ...updateVenueDto };

      const venueRepository = {
        findOneBy: jest.fn().mockResolvedValue(existingVenue),
        save: jest.fn().mockResolvedValue(mergedVenue),
      };
      (service as any).venueRepository = venueRepository;

      const result = await service.updateVenue(1, updateVenueDto);
      expect(venueRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(venueRepository.save).toHaveBeenCalledWith(mergedVenue);
      expect(result).toEqual(expect.objectContaining({ name: 'Updated Venue', phone: '123-456-7890' }));
    });
  })

  describe('deleteVenue', () => {
    // Check if the deleteVenue method is defined
    it('should be defined', () => {
      expect(service.deleteVenue).toBeDefined();
    });

    // Check if deleteVenue removes the venue when found
    it('should remove the venue when found', async () => {
      const existingVenue = {
        id: 1,
        name: 'Test Venue',
        address1: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zip: '12345',
      };

      const venueRepository = {
        findOneBy: jest.fn().mockResolvedValue(existingVenue),
        remove: jest.fn().mockResolvedValue(undefined),
      };
      (service as any).venueRepository = venueRepository;

      await service.deleteVenue(1);
      expect(venueRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(venueRepository.remove).toHaveBeenCalledWith(existingVenue);
    });

    // Check if deleteVenue throws NotFoundException when venue not found
    it('should throw NotFoundException when venue not found', async () => {
      const venueRepository = {
        findOneBy: jest.fn().mockResolvedValue(null),
      };
      (service as any).venueRepository = venueRepository;

      await expect(service.deleteVenue(1)).rejects.toThrow('Venue with id 1 not found');
      expect(venueRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  })
});
