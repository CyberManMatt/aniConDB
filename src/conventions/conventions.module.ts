import { forwardRef, Module } from '@nestjs/common';
import { ConventionsController } from './conventions.controller';
import { ConventionsService } from './providers/conventions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convention } from './convention.entity';
import { HotelsModule } from '../hotels/hotels.module';
import { HotelsService } from '../hotels/providers/hotels.service';
import { PaginationModule } from '../common/pagination/pagination.module';

@Module({
  controllers: [ConventionsController],
  providers: [ConventionsService],
  exports: [ConventionsService],
  imports: [TypeOrmModule.forFeature([Convention]), PaginationModule],
})
export class ConventionsModule {}
