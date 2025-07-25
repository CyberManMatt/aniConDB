import { CreateConDto } from './create-con.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetConsDto extends CreateConDto {
  @ApiProperty({ description: 'The unique identifier of the convention' })
  id: number;
}
