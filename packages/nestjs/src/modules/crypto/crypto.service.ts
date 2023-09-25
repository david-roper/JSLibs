import crypto from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';

import { CRYPTO_MODULE_OPTIONS_TOKEN, type CryptoModuleOptions } from './crypto.config';

@Injectable()
export class CryptoService {
  constructor(@Inject(CRYPTO_MODULE_OPTIONS_TOKEN) private readonly config: CryptoModuleOptions) {}

  hash(source: string) {
    return crypto
      .createHash('sha256')
      .update(source + this.config.secretKey)
      .digest('hex');
  }

  async hashPassword(password: string) {
    return Bun.password.hash(password);
  }

  async comparePassword(password: string, hash: string) {
    return Bun.password.verify(password, hash);
  }
}
