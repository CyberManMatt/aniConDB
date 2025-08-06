import { Module } from '@nestjs/common';
import { AdmissionsService } from './providers/admissions.service';
import { AdmissionsController } from './admissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admission } from './admission.entity';

@Module({
  controllers: [AdmissionsController],
  imports: [TypeOrmModule.forFeature([Admission])], // Importing TypeOrmModule if needed in the future
  exports: [AdmissionsService], // Exporting AdmissionsService to make it available in other modules
  providers: [AdmissionsService],
})
export class AdmissionsModule {}
