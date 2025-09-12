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

  it('should be defined', () => {});
});
