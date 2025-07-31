import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import profileConfig from './config/profile.config';
import { ConfigModule } from '@nestjs/config';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindByEmailProvider } from './providers/find-by-email.provider';
import jwtConfig from '../auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CreateUserProvider, FindByEmailProvider],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(profileConfig),
  ],
})
export class UsersModule {}
