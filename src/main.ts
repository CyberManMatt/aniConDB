import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import * as process from 'node:process';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { readdir, readFile } from 'fs/promises';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['log'],
  });

   const viewsPath = join(__dirname, '..', 'views');
   const partialsPath = join(viewsPath, 'partials');

   // Register handlebars partials
   try {
     const files = await readdir(partialsPath);
     for (const file of files) {
       if (file.endsWith('.hbs')) {
         const content = await readFile(join(partialsPath, file), 'utf8');
         const partialName = file.replace('.hbs', '');
         hbs.handlebars.registerPartial(partialName, content);
       }
     }
   } catch (error) {
     // eslint-disable-next-line no-console
     console.error('Failed to register handlebars partials:', error);
     throw error; // Re-throw to prevent app from starting with missing partials
   }
   const fs = require('fs');

   // Register partials before setting up views
   await hbs.registerPartials(partialsPath);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(viewsPath);
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('AniConDB API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
