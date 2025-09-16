import { Test, TestingModule } from '@nestjs/testing';
import { HotelsService } from './hotels.service';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Hotel } from '../hotel.entity';
import { Convention } from 'src/conventions/convention.entity';
import { IsDefined } from 'class-validator';

describe('HotelsService', () => {
    let service: HotelsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelsService,
                { provide: PaginationProvider, useValue: {} },
                { provide: DataSource, useValue: {} },
                { provide: getRepositoryToken (Hotel), useValue: {} },
                { provide: getRepositoryToken (Convention), useValue: {} }
            ],
        }).compile();

        service = module.get<HotelsService>(HotelsService);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    describe('getHotels', () => {

        // Check that the method returns an array of hotels
        it('should return an array of hotels', async () => {
            const result = [{ id: 1, name: 'Hotel 1' }, { id: 2, name: 'Hotel 2' }];
            jest.spyOn(service, 'getHotels').mockResolvedValue(result as any);
            expect(await service.getHotels({page: 1, limit: 10})).toBe(result);
        });

        // Check that the method handles pagination correctly
        it('should handle pagination correctly', async () => {
            const result = [{ id: 1, name: 'Hotel 1' }, { id: 2, name: 'Hotel 2' }];
            jest.spyOn(service, 'getHotels').mockResolvedValue(result as any);
            expect(await service.getHotels({page: 2, limit: 5})).toBe(result);
        });
    })
});