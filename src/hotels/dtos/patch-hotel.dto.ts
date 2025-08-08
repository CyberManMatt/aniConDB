import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDto } from './create-hotel.dto';

export class PatchHotelDto extends PartialType(CreateHotelDto) {}
