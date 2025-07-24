import { Module } from '@nestjs/common';
import { ConventionsController } from './conventions.controller';

@Module({
  controllers: [ConventionsController],
})
export class ConventionsModule {}
