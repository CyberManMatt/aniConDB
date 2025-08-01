import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as Buffer from 'node:buffer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const salt = await bcrypt.genSalt();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    return bcrypt.hash(data, salt);
  }

  comparePassword(data: string | Buffer, encrypted: string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    return bcrypt.compare(data, encrypted);
  }
}
