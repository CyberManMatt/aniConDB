import { CreateConDto } from './create-con.dto';
import { Exclude } from 'class-transformer';

export class GetConDetailDto extends CreateConDto {
  @Exclude()
  id: number;
}
