import crypto from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';

import { CRYPTO_CONFIG_TOKEN, type CryptoConfig } from './crypto.config';

@Injectable()
export class CryptoService {
  constructor(@Inject(CRYPTO_CONFIG_TOKEN) private readonly config: CryptoConfig) {}

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
