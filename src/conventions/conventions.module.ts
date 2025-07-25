import { Module } from '@nestjs/common';
import { ConventionsController } from './conventions.controller';
import { ConventionsService } from './providers/conventions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convention } from './convention.entity';

@Module({
  controllers: [ConventionsController],
  providers: [ConventionsService],
  exports: [ConventionsService],
  imports: [TypeOrmModule.forFeature([Convention])], // Importing TypeOrmModule if needed in the future
  // Importing the ConventionsService to make it available in this module
})
export class ConventionsModule {}
