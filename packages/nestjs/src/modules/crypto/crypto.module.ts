import { Module } from '@nestjs/common';

import { ConfigurableCryptoModule } from './crypto.config';
import { CryptoService } from './crypto.service';

@Module({
  exports: [CryptoService],
  providers: [CryptoService]
})
export class CryptoModule extends ConfigurableCryptoModule {}
