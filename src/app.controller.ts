import { Controller, Get, Render } from '@nestjs/common';

import { AppService } from './app.service';
import { Auth } from './auth/decorators/auth.decorator';
import { AuthType } from './auth/enums/auth-type.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Auth(AuthType.None)
  @Get()
  @Render('index')
  index() {
    return { serverTime: `Current Date: `, pageTitle: 'aniConDB - Index' };
  }
}
