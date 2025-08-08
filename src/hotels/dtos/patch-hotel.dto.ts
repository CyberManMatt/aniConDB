import { PartialType } from '@nestjs/swagger';
import { CreateHotelDto } from './create-hotel.dto';

export class PatchHotelDto extends PartialType(CreateHotelDto) {}
