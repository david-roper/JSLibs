import { type DynamicModule, Module } from '@nestjs/common';

import { CRYPTO_CONFIG_TOKEN, type CryptoConfig } from './crypto.config';
import { CryptoService } from './crypto.service';

@Module({})
export class CryptoModule {
  register(config: CryptoConfig): DynamicModule {
    return {
      module: CryptoModule,
      providers: [
        CryptoService,
        {
          provide: CRYPTO_CONFIG_TOKEN,
          useValue: config
        }
      ],
      exports: [CryptoService]
    };
  }
}
