import { CreateVenueDto } from './create-venue.dto';
import { PartialType } from '@nestjs/swagger';

export class PatchVenueDto extends PartialType(CreateVenueDto) {}
