import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { AuthService } from '../../auth/providers/auth.service';
import profileConfig from '../config/profile.config';
import { CreateUserProvider } from './create-user.provider';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FindByEmailProvider } from './find-by-email.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    private readonly createUserProvider: CreateUserProvider,

    private readonly findByEmailProvider: FindByEmailProvider,
  ) {}

  public createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }
  
  public getAllUsers() {}

  public async getUserById(id: number) {
    let user
    
    try {
      user = await this.userRepository.findOneBy({id});
    } catch (e) {
      throw new RequestTimeoutException(e, {description: 'Error connecting to the the datbase'})
    }

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    return user;
  }

  public async getUserByEmail(email: string) {
    return this.findByEmailProvider.findByEmail(email);
  }
  public updateUser() {}
  public deleteUser() {}
}
