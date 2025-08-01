import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindByEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findByEmail(email: string) {
    let user: User | null;

    try {
      user = await this.usersRepository.findOneBy({ email: email });
    } catch (e) {
      throw new RequestTimeoutException('Database request timed out', {
        description: e.message,
      });
    }
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
