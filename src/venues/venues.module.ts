import { Module } from '@nestjs/common';
import { VenuesController } from './venues.controller';
import { VenuesService } from './providers/venues.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './venue.entity';

@Module({
  controllers: [VenuesController],
  exports: [VenuesService],
  providers: [VenuesService],
  imports: [TypeOrmModule.forFeature([Venue])],
  // Importing the VenuesService to make it available in this module
})
export class VenuesModule {}
