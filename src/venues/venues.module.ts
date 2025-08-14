import { Module } from '@nestjs/common';
import { VenuesController } from './venues.controller';
import { VenuesService } from './providers/venues.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './venue.entity';
import { PaginationModule } from '../common/pagination/pagination.module';

@Module({
  controllers: [VenuesController],
  exports: [VenuesService],
  providers: [VenuesService],
  imports: [TypeOrmModule.forFeature([Venue]), PaginationModule],
  // Importing the VenuesService to make it available in this module
})
export class VenuesModule {}
