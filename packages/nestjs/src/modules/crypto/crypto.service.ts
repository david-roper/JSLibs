import Bun from 'bun';
import crypto from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';

import { CRYPTO_MODULE_OPTIONS_TOKEN, type CryptoModuleOptions } from './crypto.config';

@Injectable()
export class CryptoService {
  constructor(@Inject(CRYPTO_MODULE_OPTIONS_TOKEN) private readonly options: CryptoModuleOptions) {}

  async comparePassword(password: string, hash: string) {
    return Bun.password.verify(password, hash);
  }

  hash(source: string) {
    return crypto
      .createHash('sha256')
      .update(source + this.options.secretKey)
      .digest('hex');
  }

  async hashPassword(password: string) {
    return Bun.password.hash(password);
  }
}
