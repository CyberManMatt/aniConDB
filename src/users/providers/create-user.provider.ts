import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { HashingProvider } from '../../auth/providers/hashing.provider';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser: User | null;
    const { password, ...userDetails } = createUserDto;
    const hashedPassword = await this.hashingProvider
      .hashPassword(password)
      .catch((error) => {
        throw new RequestTimeoutException('Password hashing timed out', {
          description: error.message,
        });
      });

    try {
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException('Database request timed out', {
        description: error.message,
      });
    }

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    let newUser = this.userRepository.create({
      ...userDetails,
      password: hashedPassword,
      pronouns: userDetails.pronouns?.join(','),
      socials: userDetails.socials?.join(','),
    });

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException('Database request timed out', {
        description: error.message,
      });
    }

    return newUser;
  }
}
