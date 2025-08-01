import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { UsersService } from '../../users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,

    private readonly jwtService: JwtService,

    private readonly generateTokensProvider: GenerateTokensProvider,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signIn(signInDto: SignInDto) {
    const user = await this.usersService.getUserByEmail(signInDto.email);
    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (e) {
      throw new RequestTimeoutException(e, {
        description: "Couldn't compare passwords",
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate access token
    return await this.generateTokensProvider.generateTokens(user);
  }
}
