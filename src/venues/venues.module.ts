import { Module } from '@nestjs/common';
import { VenuesController } from './venues.controller';

@Module({
  controllers: [VenuesController],
})
export class VenuesModule {}
