import { PartialType } from '@nestjs/swagger';
import { CreateConDto } from './create-con.dto';

export class PatchConDto extends PartialType(CreateConDto) {}
