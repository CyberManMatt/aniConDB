import { forwardRef, Module } from '@nestjs/common';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './providers/vendors.service';
import { Type } from 'class-transformer';
import { Convention } from 'src/conventions/convention.entity';
import { ConventionsModule } from 'src/conventions/conventions.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { Vendor } from './vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [VendorsController],
  providers: [VendorsService],
  exports: [VendorsService],
  imports: [
    TypeOrmModule.forFeature([Vendor, Convention]),
    forwardRef(() => ConventionsModule),
    PaginationModule,
  ],
})
export class VendorsModule {}
