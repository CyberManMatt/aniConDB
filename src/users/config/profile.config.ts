import { registerAs } from '@nestjs/config';

export default registerAs('profile', () => ({
  apiKey: 'apiKey goes here',
}));
