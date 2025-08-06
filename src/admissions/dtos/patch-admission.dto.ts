import { PartialType } from '@nestjs/swagger';
import { CreateAdmissionDto } from './create-admission.dto';

export class PatchAdmissionDto extends PartialType(CreateAdmissionDto) {}
