import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VenuesModule } from './venues/venues.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import * as process from 'node:process';
import { Venue } from './venues/venue.entity';
import { ConventionsModule } from './conventions/conventions.module';
import { Convention } from './conventions/convention.entity';

@Module({
  imports: [
    VenuesModule,
    ConventionsModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        entities: [Venue, Convention],
        synchronize: true,
        port: 5432,
        host: 'localhost',
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
