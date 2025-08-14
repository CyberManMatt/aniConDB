import { forwardRef, Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './providers/hotels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { ConventionsModule } from '../conventions/conventions.module';
import { Convention } from '../conventions/convention.entity';
import { PaginationModule } from '../common/pagination/pagination.module';

@Module({
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [HotelsService],
  imports: [
    TypeOrmModule.forFeature([Hotel, Convention]),
    forwardRef(() => ConventionsModule),
    PaginationModule,
  ],
})
export class HotelsModule {}
