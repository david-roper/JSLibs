import { Module } from '@nestjs/common';

import { ConfigurableCryptoModule } from './crypto.config';
import { CryptoService } from './crypto.service';

@Module({
  providers: [CryptoService],
  exports: [CryptoService]
})
export class CryptoModule extends ConfigurableCryptoModule {}
